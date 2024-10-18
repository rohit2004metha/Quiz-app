import React from 'react';
import './HomePage.css'; // Import the CSS file

// Home Component
const Home = ({ onStartQuiz }) => (
    <div className="home-container">
        <h1 className="header">Welcome to the Quiz App</h1>
        <button className="start-button" onClick={onStartQuiz}>Start Quiz</button>
        {/* If you have a card or any other component, you can add it here */}
        <div className="card">
            {/* Card content goes here */}
        </div>
    </div>
);

export default Home;
