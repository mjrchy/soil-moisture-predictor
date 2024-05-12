# Soil Moisture Predictor

## Team Members
1. Jiratchaya Thongsuthum 6410546122 
Department of a Software and Knowledge Engineering, Kasetsart University
2. Worawalan Chatlatanagulchai 6510545713 
Department of a Software and Knowledge Engineering, Kasetsart University

## Project Overview
The Soil Moisture Predictor project aims to visualize data collected from primary and secondary sources, including soil moisture, PM2.5, air humidity, temperature, and wind speed. The application also provides a soil moisture prediction feature using other environmental variables as predictors.

## Features
1. Predict soil moisture from PM2.5, air humidity, temperature, and wind speed.
2. View current values of PM2.5, air humidity, temperature, and wind speed based on the user's location.
3. Visualize data through histograms, line plots, and correlation analysis using a heatmap.
4. Show descriptive statistics of air humidity, Pm 2.5, wind speed, soil moisture, and temperature.

## Prerequisites
- **Node.js:** [Download and Install Node.js](https://nodejs.org/)
- **npm:** [npm Installation Guide](https://docs.npmjs.com/getting-started/installing-node)
- **Python:** [Download and Install Python](https://www.python.org/downloads/)
- **pip:** (Included with Python by default)

### Installation
1. Clone the repository: 
  ```
  git clone https://github.com/mjrchy/soil-moisture-predictor.git
  ```
2. Create a virtual environment:
   - **Windows**: 

    ```
    python -m venv env
    .\env\Scripts\activate
    ```

   - **macOS**:
     
    ```
     python3 -m venv env
     source env/bin/activate
    ```

3. Navigate to the backend directory: 
    ```
    cd api
    ```
4. Install the required libraries: 
    ```
    pip install -r requirements.txt
    ```

## Running Application

### 1. Backend

1. Navigate to the backend directory: 
  ```
  cd api
  ```
2. Run the FastAPI server: 
  ```
  uvicorn main:app --reload
  ```

### 2. Frontend
1. Open new a terminal and navigate to the frontend directory: 
```
cd frontend
```
2. Install frontend dependencies: 
```
npm install
```
```
npm install @mui/material @emotion/react @emotion/styled
```
3. Start the frontend server: 
```
npm start
```
4. Explore the Soil Moisture Predictor at [http://localhost:3000](http://localhost:3000)

### Configuration

1. Create a config.py in the api folder (see the example of config.py in example.config)
```
DB_HOST = <database hostname or ip address>
DB_USER = <database user>
DB_PASSWD = <database password>
DB_NAME = <database name>
```
2. Create .env file in the frontend folder and obtain the api key from https://www.weatherapi.com/ after signing in. (see the example of .env in example.env)
```
REACT_APP_API_KEY=<api-key-from-weatherapi>
```
