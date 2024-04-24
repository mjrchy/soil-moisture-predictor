from .models import model
from .database import pool
import numpy as np
import xgboost as xgb

def transform_adc_to_resistance(adc_value):
    if adc_value == 0:
        return 0
    V_A = (adc_value / 4095.0) * 1.1
    Rs = (2626e3 - 1010e3 * V_A - 100 * V_A) / V_A
    return Rs

def fetch_weather_data():
    conn = pool.connection()
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

# Load your trained XGBoost model
model = xgb.XGBRegressor()  # Initialize the model
model.load_model("model/soil_moisture_model.json")  # Load the actual model

def predict_soil_moisture(data):
    input_data = np.array([[data.air_humidity, data.temperature, data.pm2_5, data.wind_speed]])
    try:
        prediction = model.predict(input_data)
        predicted_soil_moisture = transform_adc_to_resistance(prediction[0])
    except Exception as e:
        raise Exception(str(e))
    return {"soil_moisture": predicted_soil_moisture}

