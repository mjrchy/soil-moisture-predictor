import xgboost as xgb
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

import numpy as np

print("Script started")
data = pd.read_csv("predictors.csv")
X = data[['air_humidity', 'temperature', 'pm2_5', 'wind_speed']]
y = data['soil_moisture']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = xgb.XGBRegressor(objective ='reg:squarederror', colsample_bytree = 0.3, learning_rate = 0.1,
                max_depth = 5, alpha = 10, n_estimators = 100)
model.fit(X_train, y_train)

# Evaluate model
predictions = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, predictions))
print(f"RMSE: {rmse}")

# Save model
model.save_model('api/soil_moisture_model.json')
print("Script ended")