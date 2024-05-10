import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import DescriptiveBox from '../../components/descriptive_box/DescriptiveBox';
import './descriptive-page.css';

function DescriptivePage() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/statistics`);
        if (response.statusText === "OK") {
          setStatistics(response.data);
          console.log("Fetched data:", response.data);
        } else {
          console.error('Failed to fetch statistics:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="descriptive-page">
      <div className="content">
        <div className="topic">Descriptive</div>
        <div className="descriptive-boxes">
          {statistics && (
            <>
              <DescriptiveBox
                src='./icons/airhumidity-icon.png'
                valuesName="Air Humidity"
                mean={Math.round(statistics.mean.air_humidity)}
                min={Math.round(statistics.min.air_humidity)}
                max={Math.round(statistics.max.air_humidity)}
                std={Math.round(statistics.std.air_humidity)}
                median={Math.round(statistics.median.air_humidity)}
                unit="%"
              />
              <DescriptiveBox
                src='./icons/pm25-icon.png'
                valuesName="Pm 2.5"
                mean={Math.round(statistics.mean.pm2_5)}
                min={Math.round(statistics.min.pm2_5)}
                max={Math.round(statistics.max.pm2_5)}
                std={Math.round(statistics.std.pm2_5)}
                median={Math.round(statistics.median.pm2_5)}
                unit="µg/m3"
              />
              <DescriptiveBox
                src='./icons/soilmoisture-icon.png'
                valuesName="Soil Moisture"
                mean={Math.round(statistics.mean.soil_moisture)}
                min={Math.round(statistics.min.soil_moisture)}
                max={Math.round(statistics.max.soil_moisture)}
                std={Math.round(statistics.std.soil_moisture)}
                median={Math.round(statistics.median.soil_moisture)}
                unit="ohms (Ω)"
              />
              <DescriptiveBox
                src='./icons/temp-icon.png'
                valuesName="Temperature"
                mean={Math.round(statistics.mean.temperature)}
                min={Math.round(statistics.min.temperature)}
                max={Math.round(statistics.max.temperature)}
                std={Math.round(statistics.std.temperature)}
                median={Math.round(statistics.median.temperature)}
                unit="Celsius"
              />
              <DescriptiveBox
                src='./icons/windspeed-icon.png'
                valuesName="Wind Speed"
                mean={Math.round(statistics.mean.wind_speed)}
                min={Math.round(statistics.min.wind_speed)}
                max={Math.round(statistics.max.wind_speed)}
                std={Math.round(statistics.std.wind_speed)}
                median={Math.round(statistics.median.wind_speed)}
                unit="km/h"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DescriptivePage;
