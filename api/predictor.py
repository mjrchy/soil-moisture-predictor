from typing import List
from pydantic import BaseModel
import pymysql
from dbutils.pooled_db import PooledDB
from fastapi import FastAPI
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
    timestamp: str
    air_humidity: int
    temperature: int
    pm2_5: int
    rainfall: float
    wind_speed: float
    soil_moisture: int


# Define a function to get weather data from the database
@app.get("/weather-data")
def get_weather_data() -> list[WeatherData]:
    conn = pool.connection()  # Get a connection from the pool
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT id, timestamp, air_humidity, temperature, pm2_5, rainfall, wind_speed, soil_moisture FROM weather_station
            """)
            rows = cursor.fetchall()
            return [
                WeatherData(
                    id=row[0],
                    timestamp=row[1],
                    air_humidity=row[2],
                    temperature=row[3],
                    pm2_5=row[4],
                    rainfall=row[5],
                    wind_speed=row[6],
                    soil_moisture=row[7]
                ) for row in rows
            ]
    finally:
        conn.close()
