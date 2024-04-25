import React, { useState, useEffect } from 'react';
import './histogram-container.css';

const HistogramContainer = (props) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/visualize/histogram/${props.featureName}`);
        if (response.ok) {
          const blob = await response.blob();
          setImageUrl(URL.createObjectURL(blob));
        } else {
          console.error('Failed to fetch image:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [props.featureName]);

  return (
    <div className="container">
      <div className="value-topic">
        <img src={props.src} alt="" />
        <div className='name'>{props.valueName}</div>
      </div>
      <div className='img-container'>
        {imageUrl && <img src={imageUrl} alt={`Histogram for ${props.featureName}`} />}
      </div>
    </div>
  );
};

export default HistogramContainer;
