import xgboost as xgb
import numpy as np

# Load model
model = xgb.XGBRegressor()
model.load_model("/Users/amyworawalan/soil_moisture_predictor/model/soil_moisture_model.json")

def predict_soil_moisture(request):

    features = np.array([
        request["air_humidity"],
        request["temperature"],
        request["pm2_5"],
        request["wind_speed"]
    ]).reshape(1, -1)

    prediction = model.predict(features[0])
    return prediction[0] 