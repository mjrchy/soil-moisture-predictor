import React, { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import './histogram-container.css';

const HistogramContainer = (props) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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
      <div className='img-container' style={{justifyContent: 'center'}}>
        {loading ? (
          <Skeleton variant="rectangular" width={1025} height={490} style={{ margin: '40px' }} />
        ) : (
          <img src={imageUrl} alt={`Histogram for ${props.featureName}`} style={{ width: '800px', margin: '40px' }} />
        )}
      </div>
    </div>
  );
};

export default HistogramContainer;
