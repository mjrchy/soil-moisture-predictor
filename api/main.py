import io
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from .schemas import WeatherData, SoilMoistureRequest
from .services import fetch_weather_data, generate_histogram, get_dataset, predict_soil_moisture, generate_line_plot, generate_heatmap
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

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
    
@app.get("/visualize/histogram/{feature_name}")
async def histogram(feature_name: str):
    df = get_dataset()  
    if feature_name not in df.columns:
        raise HTTPException(status_code=404, detail="Feature not found")
    
    response = generate_histogram(df, feature_name)
    return response

@app.get("/visualize/lineplot")
def visualize_line_plot():
    image = generate_line_plot()
    return StreamingResponse(io.BytesIO(image), media_type="image/png")

@app.get("/visualize/heatmap")
def visualize_heatmap():
    image = generate_heatmap()
    return StreamingResponse(io.BytesIO(image), media_type="image/png")

@app.get("/statistics/", response_model=dict)
def descriptive_statistics():
    try:
        df = get_dataset()  # Assuming a function that fetches your dataset
        # Calculating descriptive statistics
        stats = df.describe().transpose()  # transpose to have statistics as columns
        stats['median'] = df.median()  # Adding median since .describe() does not include it by default
        return stats.to_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
