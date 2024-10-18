// src/components/Report.jsx
import React from 'react';
import './Report.css'; // Import the CSS file

const Report = ({ score, correct, incorrect, onRestart }) => {
  return (
    <div className="report">
      <h2>Your Score: {score}</h2>
      <p>Correct Answers: {correct}</p>
      <p>Incorrect Answers: {incorrect}</p>
      <button onClick={onRestart}>Start Again</button>
    </div>
  );
};

export default Report;
