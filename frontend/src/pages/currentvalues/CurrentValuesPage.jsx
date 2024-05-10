import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './currentvalues-page.css';
import ValueBox from '../../components/value_box/ValueBox';

const apiKey = process.env.REACT_APP_API_KEY;

function CurrentValuesPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latitude !== null && longitude !== null) {
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`);
          console.log(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`)
          setWeatherData(response.data);
          console.log("Fetched data:", response.data);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <div className='currentvalues-page'>
      <div className='content'>
        <div className='flex space-btw'>
          <div className="topic">Current Values</div>
          <div className="location flex">
            <img src="/icons/location-icon.png" alt="" />
            <p>based on your location</p>
          </div>
        </div>
        <div className="value-boxes">
          {weatherData && (
            <>
              <ValueBox src="/icons/airhumidity-icon.png" value={weatherData.current.humidity} valueUnit="%" valueName=" Air Humidity" className="value-box" />
              <ValueBox src="/icons/pm25-icon.png" value={weatherData.current.air_quality.pm2_5} valueUnit="µg/m3" valueName="PM 2.5" className="value-box" />
              <ValueBox src="/icons/rainfall-icon.png" value={weatherData.current.precip_mm} valueUnit="mm" valueName="Rainfall" className="value-box" />
              <ValueBox src="/icons/temp-icon.png" value={weatherData.current.temp_c} valueUnit="Celsius" valueName="Temperature" className="value-box" />
              <ValueBox src="/icons/windspeed-icon.png" value={weatherData.current.wind_kph} valueUnit="km/h" valueName="Wind Speed" className="value-box" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CurrentValuesPage;
