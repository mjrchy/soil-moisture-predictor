import xgboost as xgb
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, mean_absolute_percentage_error
from xgboost import XGBRegressor
from sklearn.utils import resample
import numpy as np
import joblib

def evaluate_result(test_set, prediction):
    mse = mean_squared_error(test_set, prediction)
    rmse = mean_squared_error(test_set, prediction, squared=False)
    mae = mean_absolute_error(test_set, prediction)
    relative_error = (rmse / np.mean(test_set)) * 100
    print('Mean Squared Error:', mse)
    print('Root Mean Squared Error:', rmse)
    print('Mean Absolute Error:', mae)
    print('Relative Error:', relative_error)


def train_model():
    print("Script started")
    data = pd.read_csv("predictors.csv")

    # Drop unnecessary columns
    data.drop(columns=['id', 'timestamp'], inplace=True)

    # Remove outliers from dataset
    Q1 = data.quantile(0.25)
    Q3 = data.quantile(0.75)
    IQR = Q3 - Q1

    data_no_outlier = data[~((data < (Q1 - 1.5 * IQR)) |(data > (Q3 + 1.5 * IQR))).any(axis=1)]
    # Split data into features and target
    X = data_no_outlier[['air_humidity', 'temperature', 'pm2_5', 'wind_speed']]
    y = data_no_outlier['soil_moisture']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Scale data
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train model
    xgb_regressor = XGBRegressor(reg_alpha=0.1, reg_lambda=0.1)
    model = xgb_regressor.fit(X_train_scaled, y_train)
    predictions = model.predict(X_test_scaled)
    evaluate_result(y_test, predictions)

    # Save model
    joblib.dump(model, 'model/soil_moisture_model.pkl')
    print("Model saved")

train_model()

