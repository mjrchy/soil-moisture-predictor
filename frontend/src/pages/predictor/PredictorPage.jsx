import React from 'react'
import './predictor-page.css'
import InputPredictor from '../../components/input_predictor/InputPredictor'

function PredictorPage() {
  return (
    <div className='predictor-page'>
      <div className='content'>
        <div className='topic'>Soil Moisture Predictor</div>
        <div className='inputs'>
          <InputPredictor src="/icons/airhumidity-icon.png" valuesName="Air Humidity" valuesUnit="g/m3" className="input-predictor" /> 
          <InputPredictor src="/icons/pm25-icon.png" valuesName="Pm 2.5" valuesUnit="µg/m3" className="input-predictor" /> 
          <InputPredictor src="/icons/temp-icon.png" valuesName="Temperature" valuesUnit="Celsius" className="input-predictor" /> 
        </div>
        <button>Predict</button>
      </div>
    </div>
  )
}

export default PredictorPage