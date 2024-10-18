// src/components/Question.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Question = ({ question, onNext, questionIndex }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    const timeTaken = 10; // Replace with actual time tracking logic
    onNext(selectedOptions, timeTaken);
  };

  return (
    <div className="question">
      <h2>{question.text}</h2>
      {question.image && <img src={question.image} alt="Question" />}
      <div>
        {question.options.map(option => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={selectedOptions.length === 0}>
        Next
      </button>
    </div>
  );
};

export default Question;
