from typing import List
from fastapi import FastAPI, HTTPException
from .schemas import WeatherData, SoilMoistureRequest
from .services import fetch_weather_data, predict_soil_moisture

app = FastAPI()

@app.get("/weather-data", response_model=List[WeatherData])
def get_weather_data():
    try:
        return fetch_weather_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-soil-moisture", response_model=dict)
def post_predict_soil_moisture(data: SoilMoistureRequest):
    try:
        return predict_soil_moisture(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
