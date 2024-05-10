import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import './value-box.css';

const ValueBox = (props) => {
  const { src, valueName, value, valueUnit } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay time as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Run only once on component mount

  if (loading) {
    return (
      <div className='value-box'>
        <div className="values-name">
          <Skeleton variant="circular" width={40} height={40} />
          <div className='name'><Skeleton width={100} /></div>
        </div>
        <div className='value-unit'>
          <div className='unit'><Skeleton width={50} /></div>
        </div>
      </div>
    );
  }

  return (
    <div className='value-box'>
      <div className="values-name">
        <img src={src} alt={valueName} />
        <div className='name'>{valueName}</div>
      </div>
      <div className='value-unit'>
        <div className='unit'>{value} {valueUnit}</div>
      </div>
    </div>  
  );
}

export default ValueBox;
