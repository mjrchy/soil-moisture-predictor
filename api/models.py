import xgboost as xgb
import numpy as np

# Load model
model = xgb.XGBRegressor()
model.load_model("soil_moisture_model.json")
# add logging
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def predict_soil_moisture(request):
    logger.info(f"Request: {request}")
    features = np.array([
        request.air_humidity,
        request.temperature,
        request.pm2_5,
        request.wind_speed
        ])
    features = [features.reshape(1, -1)]
    logger.info(f"Data: {features}")
    prediction = model.predict(features)
    import sys
    sys.stdout = open('soil.log', 'w')
    return {"prediction": prediction[0]}