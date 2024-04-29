import React from 'react'
import './descriptive-page.css';
import DescriptiveBox from '../../components/descriptive_box/DescriptiveBox';

function DescriptivePage() {
  return (
    <div className="descriptive-page">
      <div className="content">
        <div className="topic">Descriptive</div>
        <div className="descriptive-boxes">
        <DescriptiveBox src='./icons/airhumidity-icon.png' valuesName="Air Humidity" mean="42" unit="mm" />
        <DescriptiveBox src='./icons/airhumidity-icon.png' valuesName="Air Humidity" mean="42" unit="mm" />
        <DescriptiveBox src='./icons/airhumidity-icon.png' valuesName="Air Humidity" mean="42" unit="mm" />
        <DescriptiveBox src='./icons/airhumidity-icon.png' valuesName="Air Humidity" mean="42" unit="mm" />
        <DescriptiveBox src='./icons/airhumidity-icon.png' valuesName="Air Humidity" mean="42" unit="mm" />
        </div>
      </div>
    </div>
  )
}

export default DescriptivePage