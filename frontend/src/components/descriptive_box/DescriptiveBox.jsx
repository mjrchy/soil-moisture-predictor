import React from 'react'
import './descriptive-box.css'

const DescriptiveBox = (props) => {
  return (
    <div className="descriptive-box">
        <div className="values-name">
            <img src={props.src} />
            <div className='name'>{props.valuesName} ({props.unit}) </div>
        </div>
        <div className="descriptive-values-container">
          <div className="descriptive-values">
            <div className="value-name">Mean</div>
            <div className="values">{props.mean}</div>
          </div>
          <div className="descriptive-values">
            <div className="value-name">Minimum</div>
            <div className="values">{props.mean}</div>
          </div>
          <div className="descriptive-values">
            <div className="value-name">Maximum</div>
            <div className="values">{props.mean}</div>
          </div>
          <div className="descriptive-values">
            <div className="value-name">STD</div>
            <div className="values">{props.mean}</div>
          </div>
          <div className="descriptive-values">
            <div className="value-name">Median</div>
            <div className="values">{props.mean}</div>
          </div>
        </div>
    </div>
  )
}

export default DescriptiveBox