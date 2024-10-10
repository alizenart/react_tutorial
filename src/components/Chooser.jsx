import { useState } from 'react';

const choices = ['Fall', 'Winter', 'Spring'];

const Chooser = ({ selection, setSelection }) => {
  return (
    <div className="btn-group">
      {choices.map((term, index) => (
        <button
          key={index}
          className={`btn ${selection === term ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelection(term)}
        >
          {term}
        </button>
      ))}
    </div>
  );
};

export default Chooser;
