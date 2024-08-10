import React, { useState } from 'react';
import SlideService from './SlideService';

const SlideEditor = () => {
  const [slides, setSlides] = useState([
    { title: 'Slide 1', content: 'This is the body of slide 1' },
    { title: 'Slide 2', content: 'This is the body of slide 2' },
    // Add more default slides if needed
  ]);

  const handleSave = async () => {
    await SlideService.saveSlides(slides);
    alert('Slides saved!');
  };

  const handleChange = (index, key, value) => {
    const newSlides = [...slides];
    newSlides[index][key] = value;
    setSlides(newSlides);
  };

  return (
    <div className="slide-editor">
      {slides.map((slide, index) => (
        <div key={index} className="slide-edit">
          <input
            type="text"
            value={slide.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
          />
          <textarea
            value={slide.content}
            onChange={(e) => handleChange(index, 'content', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSave}>Save Slides</button>
    </div>
  );
};

export default SlideEditor;
