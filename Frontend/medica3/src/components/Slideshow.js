import React, { useState, useEffect, useRef } from 'react';
import SlideService from './SlideService';
import '../styles/Slideshow.css';

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const slideshowIntervalRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      const fetchedSlides = await SlideService.getSlides();
      setSlides(fetchedSlides);
    };
    fetchSlides();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleStartSlideshow = () => {
    setIsSlideshow(true);
    setIsFullscreen(true);
    document.body.requestFullscreen();
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    slideshowIntervalRef.current = setInterval(handleNext, 3000); // Change slides every 3 seconds
  };

  const handleEndSlideshow = () => {
    setIsSlideshow(false);
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    clearInterval(slideshowIntervalRef.current);
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
      setIsSlideshow(false);
      clearInterval(slideshowIntervalRef.current);
    }
  };

  const togglePointer = () => {
    setIsPointerActive(!isPointerActive);
    document.body.style.cursor = isPointerActive ? 'auto' : 'url(/pointer.png), auto';
  };

  const handleThumbnailView = () => {
    setShowThumbnails((prev) => !prev);
  };

  const handleSlideClick = (index) => {
    setCurrentIndex(index);
    if (isSlideshow) handleEndSlideshow();
  };

  const slideStyle = {
    border: '2px solid #000', // Border for each slide
    padding: '20px',
    margin: '10px',
    backgroundColor: '#fff',
    color: '#000',
  };

  return (
    <div className={`slideshow-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="controls">
        <button onClick={handlePrevious} disabled={isSlideshow}>Previous</button>
        <button onClick={isSlideshow ? handleEndSlideshow : handleStartSlideshow}>
          {isSlideshow ? 'End Slideshow' : 'Start Slideshow'}
        </button>
        <button onClick={handleThumbnailView}>
          {showThumbnails ? 'Hide Thumbnails' : 'Show Thumbnails'}
        </button>
        <button onClick={togglePointer}>
          {isPointerActive ? 'Disable Pointer' : 'Enable Pointer'}
        </button>
      </div>

      {showThumbnails && (
        <div className="thumbnails-view">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="thumbnail"
              onClick={() => handleSlideClick(index)}
            >
              Slide {index + 1}
            </div>
          ))}
        </div>
      )}

      <div className="slide-display" style={slideStyle}>
        {slides.length > 0 && (
          <div dangerouslySetInnerHTML={{ __html: slides[currentIndex].content }} />
        )}
      </div>

      {isSlideshow && (
        <div className="slideshow">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;

