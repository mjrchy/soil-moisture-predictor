from fastapi.responses import StreamingResponse
import pandas as pd
from models import load_model, predict
from database import pool
import numpy as np
import xgboost as xgb
import io
import seaborn as sns
from sklearn.preprocessing import StandardScaler
import matplotlib
matplotlib.use('Agg')  # Use the non-GUI 'Agg' backend suitable for script environments
import matplotlib.pyplot as plt

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


def predict_soil_moisture(data):
    input_data = np.array([[data.air_humidity, data.temperature, data.pm2_5, data.wind_speed]])
    try:
        prediction = predict(input_data)
        predicted_soil_moisture = transform_adc_to_resistance(prediction[0])
    except Exception as e:
        raise Exception(str(e))
    return {"soil_moisture": predicted_soil_moisture}

def get_dataset():
    conn = pool.connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT id, timestamp, air_humidity, temperature, pm2_5, wind_speed, soil_moisture FROM predictors
            """)
            rows = cursor.fetchall()
            df = pd.DataFrame(rows, columns=['id', 'timestamp', 'air_humidity', 'temperature', 'pm2_5', 'wind_speed', 'soil_moisture'])
            return df
    finally:
        conn.close()

def get_scaled_dataset():
    df = get_dataset()
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(df.drop(columns=['id', 'timestamp']))
    scaled_df = pd.DataFrame(scaled_data, columns=['air_humidity', 'temperature', 'pm2_5', 'wind_speed', 'soil_moisture'])
    return scaled_df

def generate_histogram(df: pd.DataFrame, feature: str, bins: int = None):
    if feature not in df.columns:
        raise ValueError(f"Feature '{feature}' not found in the DataFrame.")
    
    if bins is None:  # Set default bin values based on the feature
        bins = 10 if feature == "soil_moisture" else 30
    
    plt.figure(figsize=(10, 6))
    sns.histplot(df[feature], kde=False, bins=bins)
    plt.title(f'Histogram of {feature}')
    plt.xlabel(feature)
    plt.ylabel('Frequency')
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")

def generate_line_plot():
    # Assuming get_dataset() fetches your dataset.
    df = get_scaled_dataset()  # Replace with your actual method to fetch the dataset
    
    # Calculate rolling averages
    temp_df = pd.DataFrame()
    temp_df['wind_speed'] = df['wind_speed'].rolling(window=10).mean()
    temp_df['pm2_5'] = df['pm2_5'].rolling(window=10).mean()
    temp_df['soil_moisture'] = df['soil_moisture'].rolling(window=10).mean()
    temp_df['air_humidity'] = df['air_humidity'].rolling(window=10).mean()
    temp_df['temperature'] = df['temperature'].rolling(window=10).mean()

    # Plotting
    plt.figure(figsize=(12, 6))
    sns.lineplot(data=temp_df)
    plt.title("Rolling Averages of Features")
    plt.legend(title='Feature')

    # Save plot to a buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    return buf.read()


def generate_heatmap():
    df = get_scaled_dataset()  # Replace with your actual method to fetch the dataset
    plt.figure(figsize=(10, 8))
    sns.heatmap(df.corr(), annot=True, fmt=".2f", cmap='coolwarm')
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    return buf.read()

