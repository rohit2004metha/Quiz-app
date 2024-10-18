import React, { useState } from 'react';
import './QuizApp.css';

const Home = ({ onStartQuiz }) => (
    <div className="home-container1">
        <img src="/logo.png" alt="Logo" className="home-logo" />
        <h1 className="home-title">Upraised</h1>
        <p className='Quiz'>Quiz</p>
        <button className="start-quiz-button" onClick={onStartQuiz}>Start Quiz</button>
    </div>
);


// Quiz Component
const Quiz = ({ onFinishQuiz, setScore, questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = (option) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (option === currentQuestion.correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        // Move to the next question after a brief delay
        setTimeout(() => {
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                onFinishQuiz();
            }
        }, 500);
    };

    const handleNextClick = () => {
        if (selectedOption) { // Check if an option is selected
            handleSubmit(selectedOption);
        } else {
            alert("Please select an answer before proceeding.");
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="app-container">
            <div className="home-container1">
                <div className="quiz-app-container1">
                    <h2 className="quiz-question">{currentQuestion.questionText}</h2>

                    {currentQuestion.diagram && (
                        <div className="question-diagram">
                            <img src={currentQuestion.diagram} alt="Diagram related to the question" className="diagram-image" />
                        </div>
                    )}

                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`quiz-option-button ${selectedOption === option ? 'selected' : ''}`}
                            onClick={() => setSelectedOption(option)} // Update selected option
                        >
                            <span>{option}</span>
                        </button>
                    ))}

                    <button className="next-button" onClick={handleNextClick}>Next</button>
                </div>
            </div>

            <div className="question-counter-circle">
                {currentQuestionIndex + 1}/{questions.length}
            </div>
        </div>
    );
};

// Results Component
const Results = ({ correctAnswers, incorrectAnswers, onRestart, totalQuestions }) => {
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2); // Calculate percentage

    return (
        <div className="home-container">
            <h1 className="results-title">Your Result</h1>
            <div className="percentage-circle">
                
                <span className="percentage-text">{percentage}%</span>
            </div>
            <p className="results-correct">{correctAnswers} Correct</p>
            <p className="results-incorrect">{incorrectAnswers} Incorrect</p>
            <button className="restart-button" onClick={onRestart}>Start Again</button>
        </div>
    );
};

// Add Question Form Component
const AddQuestionForm = ({ onAddQuestion }) => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [diagram, setDiagram] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddQuestion({ questionText, options, correctAnswer, diagram });
        setQuestionText('');
        setOptions(['', '']);
        setCorrectAnswer('');
        setDiagram('');
    };

    return (
        <form className="add-question-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Add New Question</h3>
            <input
                className="form-input"
                type="text"
                placeholder="Question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    className="form-input"
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                />
            ))}
            <input
                className="form-input"
                type="text"
                placeholder="Correct Answer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                required
            />
            <input
                className="form-input"
                type="text"
                placeholder="Diagram Path (e.g. /path/to/image.png)"
                value={diagram}
                onChange={(e) => setDiagram(e.target.value)}
                required
            />
            <button className="add-question-button" type="submit">Add Question</button>
        </form>
    );
};

// Main QuizApp Component
const QuizApp = () => {
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questions, setQuestions] = useState([
        {
            questionText: "How do you judge what should be added in the next version of the app?",
            options: ["Data Analysis", "User's feedback", "Copy from similar product", "Make a questionnaire", "Personal feeling"],
            correctAnswer: "User's feedback",
        },
        {
            questionText: "What is the best way to receive user feedback?",
            diagram: "/logo512.png", 
            options: ["Data Analysis", "User's feedback", "Copy from similar product", "Make a questionnaire", "Personal feeling"],
            correctAnswer: "User's feedback",
        }
    ]);

    const startQuiz = () => {
        setIsQuizStarted(true);
        setQuizFinished(false);
        setCorrectAnswers(0);
    };

    const finishQuiz = () => {
        alert("Test submitted successfully!");
        setQuizFinished(true);
    };

    const restart = () => {
        setIsQuizStarted(false);
        setQuizFinished(false);
    };

    const addQuestion = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
        alert(`New question added: "${newQuestion.questionText}"`);
    };

    const incorrectAnswers = questions.length - correctAnswers;

    return (
        <div className="quiz-app-container">
            {isQuizStarted ? (
                quizFinished ? (
                    <Results 
                        correctAnswers={correctAnswers} 
                        incorrectAnswers={incorrectAnswers} 
                        onRestart={restart} 
                        totalQuestions={questions.length} // Pass the total number of questions
                    />
                ) : (
                    <Quiz 
                        onFinishQuiz={finishQuiz} 
                        setScore={setCorrectAnswers} 
                        questions={questions}
                    />
                )
            ) : (
                <div>
                    <Home onStartQuiz={startQuiz} />
                    <AddQuestionForm onAddQuestion={addQuestion} />
                </div>
            )}
        </div>
    );
};

export default QuizApp;

