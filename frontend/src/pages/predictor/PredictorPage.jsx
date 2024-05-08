import React from 'react'
import './predictor-page.css'
import InputPredictor from '../../components/input_predictor/InputPredictor'
import axios from 'axios'; 
import { useState } from 'react';
import ValueBox from '../../components/value_box/ValueBox';

function PredictorPage() {
  const [formData, setFormData] = useState({
    "air_humidity": 0.0,
    "temperature": 0.0,
    "pm2_5": 0.0,
    "wind_speed": 0.0
  });
  
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict-soil-moisture', formData);
      setPrediction(Math.round(response.data.soil_moisture));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='predictor-page'>
      <div className='content'>
        <div className='topic'>Soil Moisture Predictor</div>
        <div className='inputs'>
          <form onSubmit={handleSubmit}>
            <InputPredictor src="/icons/airhumidity-icon.png" valuesName="Air Humidity" valuesUnit="g/m3" name="air_humidity" value={formData.air_humidity} className="input-predictor" change={handleChange} /> 
            <InputPredictor src="/icons/pm25-icon.png" valuesName="Pm 2.5" valuesUnit="µg/m3" name="pm2_5" value={formData.pm2_5} className="input-predictor" change={handleChange} /> 
            <InputPredictor src="/icons/temp-icon.png" valuesName="Temperature" valuesUnit="Celsius" name="temperature" value={formData.temperature} className="input-predictor" change={handleChange} /> 
            <InputPredictor src="/icons/windspeed-icon.png" valuesName="Wind Speed" valuesUnit="km/h" name="wind_speed" value={formData.wind_speed} className="input-predictor" change={handleChange} /> 
            <button type='submit'>Predict</button>
          </form>
          <ValueBox src="/icons/soilmoisture-icon.png" value={prediction} valueUnit="ohms (Ω)" valueName="Soil Moisture" className="value-box" />
        </div>
      </div>
    </div>
  )
}

export default PredictorPage