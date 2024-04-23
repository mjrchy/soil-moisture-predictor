from http.client import HTTPException
from typing import List
import numpy as np
from pydantic import BaseModel
import pymysql
from dbutils.pooled_db import PooledDB
from fastapi import FastAPI
from datetime import datetime
import xgboost as xgb

from api import model
from .config import DB_HOST, DB_USER, DB_PASSWD, DB_NAME

app = FastAPI()

# Pool for database
pool = PooledDB(
    creator=pymysql,
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWD,
    database=DB_NAME,
    maxconnections=1,
    blocking=True,
)

# Define Pydantic model to structure the response data
class WeatherData(BaseModel):
    id: int
    timestamp: datetime
    air_humidity: float
    temperature: float
    pm2_5: float
    wind_speed: float
    soil_moisture: float


# Define a function to transform ADC value (raw soil moisture content) to resistance
def transform_adc_to_resistance(adc_value):
    V_A = (adc_value / 4095.0) * 1.1
    Rs = (2626e3 - 1010e3 * V_A - 100 * V_A) / V_A
    return Rs


# Define a function to get weather data from the database
@app.get("/weather-data")
def get_weather_data() -> list[WeatherData]:
    conn = pool.connection()  # Get a connection from the pool
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT id, timestamp, air_humidity, temperature, pm2_5, wind_speed, soil_moisture FROM predictors
            """)
            rows = cursor.fetchall()

            # Transform soil moisture data and convert rows to dictionary format
            transformed_rows = []
            for row in rows:
                mutable_row = list(row)
                adc_value = mutable_row[6]
                Rs = transform_adc_to_resistance(adc_value)
                mutable_row[6] = Rs

                # Convert list to dictionary
                row_dict = {
                    'id': mutable_row[0],
                    'timestamp': mutable_row[1],
                    'air_humidity': mutable_row[2],
                    'temperature': mutable_row[3],
                    'pm2_5': mutable_row[4],
                    'wind_speed': mutable_row[5],
                    'soil_moisture': mutable_row[6]
                }
                transformed_rows.append(row_dict)

            return transformed_rows

    finally:
        conn.close()



# Define Pydantic model to structure the request data for predicting soil moisture
class SoilMoistureRequest(BaseModel):
    air_humidity: float
    temperature: float
    pm2_5: float
    wind_speed: float


# Load your trained XGBoost model
model = xgb.XGBRegressor()  # Initialize the model
model.load_model("model/soil_moisture_model.json")  # Load the actual model


# Define a function to predict soil moisture
@app.post("/predict-soil-moisture")
def predict_soil_moisture(data: SoilMoistureRequest) -> dict:
    # Convert incoming data to numpy array for model prediction
    input_data = np.array([[data.air_humidity, data.temperature, data.pm2_5, data.wind_speed]])
    
    # Prediction
    try:
        prediction = model.predict(input_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Return prediction
    return {"soil_moisture": prediction[0]}


