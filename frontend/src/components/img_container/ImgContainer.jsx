import React from 'react';
import { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import './img-container.css';

const ImgContainer = (props) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/${props.endpoint}`);
                if (response.ok) {
                    const blob = await response.blob();
                    setImageUrl(URL.createObjectURL(blob));
                } else {
                    console.error('Failed to fetch image:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            } finally {
                setLoading(false); // Set loading to false after image is fetched
            }
        };

        fetchImage();

        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, []);

    return (
        <div className="heatmap-container">
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height="400px" sx={{ borderRadius: '16px' }} />
            ) : (
                <div className='img-container'>
                    <img src={imageUrl} alt={"Heatmap"} style={{ width: props.width, marginLeft: props.margin }} />
                </div>
            )}
        </div>
    );
};

export default ImgContainer;
