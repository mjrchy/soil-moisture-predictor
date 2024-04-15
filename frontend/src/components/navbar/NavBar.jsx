import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav-vertical'>
        <Link to="/">Predictor</Link>
        <Link to="/currentvalues">Current Values</Link>
        <Link to="/histogram">Histogram</Link>
        <Link to="/scatterplot">Scatter Plot</Link>
        <Link to="/heatmap">Heat Map</Link>
    </div>
  )
}

export default NavBar