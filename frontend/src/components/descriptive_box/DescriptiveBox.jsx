import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import './descriptive-box.css';

const DescriptiveBox = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay with setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Run only once on component mount

  if (isLoading) {
    return (
      <div className="descriptive-box">
        <div className="values-name">
          <Skeleton variant="circular" width={40} height={40} />
          <div className='name'>
            <Skeleton variant="text" width={80} />
          </div>
        </div>
        <div className="descriptive-values-container">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="descriptive-values">
              <div className="value-name">
                <Skeleton variant="text" width={60} />
              </div>
              <div className="values">
                <Skeleton variant="text" width={40} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="descriptive-box">
      <div className="values-name">
        <img src={props.src} alt="values" />
        <div className='name'>{props.valuesName} ({props.unit}) </div>
      </div>
      <div className="descriptive-values-container">
        <div className="descriptive-values">
          <div className="value-name">Mean</div>
          <div className="values">{props.mean}</div>
        </div>
        <div className="descriptive-values">
          <div className="value-name">Minimum</div>
          <div className="values">{props.min}</div>
        </div>
        <div className="descriptive-values">
          <div className="value-name">Maximum</div>
          <div className="values">{props.max}</div>
        </div>
        <div className="descriptive-values">
          <div className="value-name">STD</div>
          <div className="values">{props.std}</div>
        </div>
        <div className="descriptive-values">
          <div className="value-name">Median</div>
          <div className="values">{props.median}</div>
        </div>
      </div>
    </div>
  );
};

export default DescriptiveBox;
