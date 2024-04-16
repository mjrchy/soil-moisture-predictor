import React from 'react'
import './value-box.css'

const ValueBox = (props) => {
  return (
    <div className='value-box'>
      <div className="values-name">
        <img src={props.src} />
        <div className='name'>{props.valueName}</div>
      </div>
      <div className='value-unit'>
        <div className='unit'>{props.value} {props.valueUnit}</div>
      </div>
    </div>  
  )
}

export default ValueBox