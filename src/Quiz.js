import React, { useState } from 'react';

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const questions = [
        {
            questionText: "What is 2 + 2?",
            options: ["3", "4", "5"],
            correctAnswer: "4",
        },
        {
            questionText: "What is the capital of France?",
            options: ["Paris", "Berlin", "Madrid"],
            correctAnswer: "Paris",
        },
    ];

    const handleSubmit = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedOption === currentQuestion.correctAnswer) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIncorrectAnswers(incorrectAnswers + 1);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setQuizFinished(false);
    };

    return (
        <div>
            {quizFinished ? (
                <div>
                    <h1>Your Score:</h1>
                    <p>Correct Answers: {correctAnswers}</p>
                    <p>Incorrect Answers: {incorrectAnswers}</p>
                    <button onClick={handleRestart}>Start Again</button>
                </div>
            ) : (
                <div>
                    <h2>{questions[currentQuestionIndex].questionText}</h2>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSubmit(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;
