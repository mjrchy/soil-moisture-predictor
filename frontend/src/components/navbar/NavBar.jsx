import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav-vertical'>
        <div className='app-logo'>
            <img src="/plant.png" />
            <div className='app-name'>
                <div className='name'>Soil Moisture</div>
                <div className='name'>Predictor</div>
            </div>
        </div>
        <div className='nav-link'>
            <Link className='link' to="/">
                <img src="/icons/predictor-icon.png" />
                <div className="link-name">Predictor</div>
            </Link>
            <Link className='link' to="/currentvalues">
                <img src="/icons/currentvalues-icon.png" />
                <div className="link-name">Current Values</div>
            </Link>
            <Link className='link' to="/histogram">
                <img src="/icons/histogram-icon.png" />
                <div className="link-name">Histogram</div>
            </Link>
            <Link className='link' to="/scatterplot">
                <img src="/icons/scatterplot-icon.png" />
                <div className="link-name">Scatter Plot</div>
            </Link>
            <Link className='link' to="/heatmap">
                <img src="/icons/heatmap-icon.png" />
                <div className="link-name">Heat Map</div>
            </Link>
        </div>
    </div>
  )
}

export default NavBar