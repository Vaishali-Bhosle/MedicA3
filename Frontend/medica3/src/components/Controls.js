import React from 'react';

const Controls = ({ onPrev, onNext, onShowAll, onPointerStart, onPointerEnd }) => {
    return (
        <div className="controls">
            <button onClick={onPrev}>Previous</button>
            <button onClick={onNext}>Next</button>
            <button onClick={onShowAll}>Show All</button>
            <button onClick={onPointerStart}>Start Pointer</button>
            <button onClick={onPointerEnd}>End Pointer</button>
        </div>
    );
};

export default Controls;