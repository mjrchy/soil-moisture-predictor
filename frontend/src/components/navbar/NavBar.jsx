import React from 'react';
import './nav-bar.css'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav-vertical'>
        <div className='app-logo'>
            <img src="/plant.png" alt="logo"/>
            <div className='app-name'>
                <div className='name'>Soil Moisture</div>
                <div className='name'>Predictor</div>
            </div>
        </div>
        <div className='nav-link'>
            <Link className='link' to="/">
                <img src="/icons/predictor-icon.png" alt="predictor-icon" />
                <div className="link-name">Predictor</div>
            </Link>
            <Link className='link' to="/currentvalues">
                <img src="/icons/currentvalues-icon.png" alt="values-icon" />
                <div className="link-name">Current Values</div>
            </Link>
            <Link className='link' to="/descriptive">
                <img src="/icons/descriptive-icon.png" alt="descriptive-icon" />
                <div className="link-name">Descriptive</div>
            </Link>
            <Link className='link' to="/lineplot">
                <img src="/icons/lineplot-icon.png" alt="lineplot-icon" />
                <div className="link-name">Line Plot</div>
            </Link>
            <Link className='link' to="/histograms">
                <img src="/icons/histogram-icon.png" alt="histogram-icon" />
                <div className="link-name">Histograms</div>
            </Link>
            <Link className='link' to="/heatmap">
                <img src="/icons/heatmap-icon.png" alt="heatmap-icon" />
                <div className="link-name">Heat Map</div>
            </Link>
        </div>
    </div>
  )
}

export default NavBar