import React from 'react';

function SlideOverview({ slides, onSelectSlide }) {
  return (
    <div className="slide-overview">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="slide-thumbnail"
          onClick={() => onSelectSlide(index)}
        >
          {slide.title}
        </div>
      ))}
    </div>
  );
}

export default SlideOverview;
