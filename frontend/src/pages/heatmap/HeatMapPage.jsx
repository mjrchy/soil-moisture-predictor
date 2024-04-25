import React from 'react'
import './heatmap-page.css'
import ImgContainer from '../../components/img_container/ImgContainer'

function HeatMapPage() {
  return (
    <div className="heatmap-page">
      <div className="content">
        <div className="topic">Heat Map</div>
        <section>
          <ImgContainer endpoint="visualize/heatmap" width="700px" />
        </section>
      </div>
    </div>
  )
}

export default HeatMapPage