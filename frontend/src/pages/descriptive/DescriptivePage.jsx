import React from 'react'
import './descriptive-page.css';
import DescriptiveBox from '../../components/descriptive_box/DescriptiveBox';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'; 


function DescriptivePage() {
  const [statistics, setStatistics] = useState('');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/statistics`);
        if (response.ok) {
          const blob = await response.blob();
          setStatistics(URL.createObjectURL(blob));
          console.log(response);
        } else {
          console.error('Failed to fetch statistics:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();

    return () => {
      URL.revokeObjectURL(statistics);
    };
  }, []);

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