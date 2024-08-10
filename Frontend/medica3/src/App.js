import React, { useState } from 'react';
import Slideshow from './components/Slideshow';
import SlideEditor from './components/SlideEditor';
import '../src/styles/App.css';

const App = () => {
  const [editing, setEditing] = useState(true);
  const [isSlideshow, setIsSlideshow] = useState(false);

  const handleToggleEditing = () => {
    setEditing(!editing);
  };

  const handleToggleSlideshow = () => {
    setIsSlideshow(!isSlideshow);
  };

  return (
    <div className={`App ${isSlideshow ? 'slideshow-active' : ''}`}>
      <button onClick={handleToggleEditing}>
        {editing ? 'Preview' : 'Edit Slides'}
      </button>
      <button onClick={handleToggleSlideshow}>
        {isSlideshow ? 'End Slideshow' : 'Start Slideshow'}
      </button>
      {editing ? <SlideEditor /> : <Slideshow />}
    </div>
  );
};

export default App;

