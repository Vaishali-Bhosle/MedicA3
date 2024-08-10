import React from 'react';

const SlideList = ({ slides, onSlideSelect }) => {
    return (
        <div className="slide-list">
            {slides.map((slide, index) => (
                <div key={index} className="slide-thumbnail" onClick={() => onSlideSelect(index)}>
                    <h3>{slide.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default SlideList;
