import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './img-container.css'

const ImgContainer = (props) => {
    const [imageUrl, setImageUrl] = useState('');

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
        }
        };

        fetchImage();

        return () => {
        URL.revokeObjectURL(imageUrl);
        };
    }, []);
    return (
        <div className="heatmap-container">
            <div className='img-container'>
            {imageUrl && <img src={imageUrl} alt={"Heatmap"} style={{ width: props.width, marginLeft: props.margin }} />}
            </div>
        </div>
  )
}

export default ImgContainer