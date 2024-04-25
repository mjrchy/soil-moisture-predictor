import React from 'react';
import ImgContainer from '../../components/img_container/ImgContainer';
import './line-plot-page.css';

function LinePlotPage() {
  return (
    <div className="lineplot-page">
      <div className="content">
        <div className="topic">Line Plot</div>
        <section>
          <ImgContainer endpoint="visualize/lineplot" />        
        </section>
      </div>
    </div>
  )
}

export default LinePlotPage