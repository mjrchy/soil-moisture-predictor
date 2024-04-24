import xgboost as xgb
import numpy as np

# Load model
model = xgb.XGBRegressor()
model.load_model("model/soil_moisture_model.json")

def predict_soil_moisture(request):
    features = np.array([[request.air_humidity, request.temperature, request.pm2_5, request.rainfall, request.wind_speed]])
    prediction = model.predict(features)
    return prediction[0]