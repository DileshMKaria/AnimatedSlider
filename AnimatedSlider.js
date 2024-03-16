import React, { useState, useEffect } from 'react';
import './AnimatedSlider.css'; // You can define your CSS styles in this file

const AnimatedSlider = ({ images, autoplay = false, interval = 3000, animationDuration = 500 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let intervalId;

    if (autoplay) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoplay, images.length, interval]);

  const handlePrev = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={index === currentImageIndex ? 'active' : ''}
            style={{
              transition: `transform ${animationDuration / 1000}s ease`,
              transform: `translateX(-${currentImageIndex * 100}%)`
            }}
          />
        ))}
      </div>
      <button className="prev" onClick={handlePrev}>&#10094;</button>
      <button className="next" onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default AnimatedSlider;
