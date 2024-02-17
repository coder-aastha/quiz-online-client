import React from "react";
import { useLocation } from "react-router-dom";

interface LocationState {
    quizQuestions: Array<{
        id: string;
        correctAnswers: string | string[];
        question: string;
        questionType: string;
    }>;
    totalScores: number;
}

export const QuizResult: React.FC = () => {
    const location = useLocation<LocationState>();
    const { quizQuestions, totalScores } = location.state;
    const numQuestions = quizQuestions.length;
    const percentage = Math.round((totalScores / numQuestions) * 100);

    const handleRetakeQuiz = () => {
        alert("Oops! This functionality was not implemented!");
        // You may implement the functionality to retake the quiz here
    };

    return (
        <section className="container mt-5">
            <h3>Your Quiz Result Summary</h3>
            <hr />
            <h5 className="text-info">
                You answered {totalScores} out of {numQuestions} questions correctly.
            </h5>
            <p>Your total score is {percentage}%.</p>

            <button className="btn btn-primary btn-sm" onClick={handleRetakeQuiz}>
                Retake this quiz
            </button>
        </section>
    );
};

