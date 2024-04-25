import React from 'react'
import './InputPredictor.css'

const InputPredictor = (props) => {
  return (
    <div className='input-predictor'>
      <div className="values-name">
        <img src={props.src} />
        <div className='name'>{props.valuesName}</div>
      </div>
      <div className='input-unit'>
        <input type="number" name={props.name} value={props.value} onChange={props.change} />
        <div className='unit'>{props.valuesUnit}</div>
      </div>
    </div>  
  );
};

export default InputPredictor