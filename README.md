## Soil Moisture Predictor

### Team Members
1. Jiratchaya Thongsuthum 6410546122 
Department of a Software and Knowledge Engineering, Kasetsart University
2. Worawalan Chatlatanagulchai 6510545713 
Department of a Software and Knowledge Engineering, Kasetsart University

### Project Overview
The Soil Moisture Predictor project aims to visualize data collected from primary and secondary sources, including soil moisture, PM2.5, air humidity, temperature, and wind speed. The application also provides a soil moisture prediction feature using other environmental variables as predictors.

### Features
1. Predict soil moisture from PM2.5, air humidity, temperature, and wind speed.
2. View current values of PM2.5, air humidity, temperature, and wind speed based on the user's location.
3. Visualize data through histograms, line plots, and correlation analysis using a heatmap.

### Required Libraries and Tools
- FastAPI for the API
- React for the frontend

### Instructions for Building and Running
1. Clone the repository: 
`git clone https://github.com/mjrchy/soil-moisture-predictor.git`
2. Create a virtual environment:
   - **Windows**: 
     ```bash
     python -m venv env
     .\env\Scripts\activate
     ```
   - **macOS**:
     ```bash
     python3 -m venv env
     source env/bin/activate
     ```
3. Install the required libraries: `pip install -r requirements.txt`
4. Run the FastAPI server: `uvicorn api.main:app --reload`
5. Navigate to the frontend directory: `cd frontend`
6. Install frontend dependencies: `npm install`
7. Start the frontend server: `npm start`
