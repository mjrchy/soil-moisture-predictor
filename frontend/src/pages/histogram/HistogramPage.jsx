import React from 'react'
import HistogramContainer from '../../components/histogram_container/HistogramContainer'
import './histogram-page.css'

function HistogramPage() {
  return (
    <div className='histogram-page'>
      <div className="content">
        <div className='topic'>Histograms</div>
        <section>
          <HistogramContainer src="/icons/soilmoisture-icon.png" featureName="soil_moisture" valueName="Soil Moisture" />
          <HistogramContainer src="/icons/airhumidity-icon.png" featureName="air_humidity" valueName="Air Humidity" />
          <HistogramContainer src="/icons/windspeed-icon.png" featureName="wind_speed" valueName="Wind Speed" />
          <HistogramContainer src="/icons/pm25-icon.png" featureName="pm2_5" valueName="Pm 2.5" />
          <HistogramContainer src="/icons/temp-icon.png" featureName="temperature" valueName="Temperature" />
        </section>
      </div>
    </div>
  )
}

export default HistogramPage