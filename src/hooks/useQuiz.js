import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Your json-server base URL

const useQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const startQuiz = async () => {
        const response = await axios.get(`${BASE_URL}/quizzes`);
        setQuestions(response.data);
    };

    const submitAnswer = async (selectedOptions, timeTaken) => {
        const questionId = questions[currentQuestionIndex].id;
        const correctAnswers = questions[currentQuestionIndex].correctAnswers;

        const isCorrect = selectedOptions.sort().toString() === correctAnswers.sort().toString();

        // Save the response to the results
        await axios.post(`${BASE_URL}/results`, {
            questionId,
            selectedOptions,
            timeTaken,
            isCorrect,
        });

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const finishQuiz = async () => {
        const response = await axios.get(`${BASE_URL}/results`);
        return response.data;
    };

    return { questions, startQuiz, submitAnswer, finishQuiz, score };
};

export default useQuiz;
