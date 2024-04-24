from pydantic import BaseModel
from datetime import datetime

class WeatherData(BaseModel):
    id: int
    timestamp: datetime
    air_humidity: float
    temperature: float
    pm2_5: float
    wind_speed: float
    soil_moisture: float

class SoilMoistureRequest(BaseModel):
    air_humidity: float
    temperature: float
    pm2_5: float
    wind_speed: float
