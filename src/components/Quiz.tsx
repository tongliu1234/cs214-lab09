import React, { Component, useEffect, useState } from "react";
import "./Quiz.css";
import QuizQuestion from "../core/QuizQuestion";
import QuizCore from "../core/QuizCore";

interface QuizState {
    currentQuestion: QuizQuestion | null;
    selectedAnswer: string | null;
    score: number;
    hasNext: boolean ;
}

const quiz = new QuizCore();

const Quiz: React.FC = () => {
    const [state, setState] = useState<QuizState>({
        currentQuestion: quiz.getCurrentQuestion(),
        selectedAnswer: null, // Initialize the selected answer.
        score: 0, // Initialize the score.
        hasNext: quiz.hasNextQuestion()
    });

    const handleOptionSelect = (option: string): void => {
        setState((prevState) => ({ ...prevState, selectedAnswer: option }));
    };

    const handleButtonClick = (): void => {
        // Task3: Implement the logic for button click, such as moving to the next question.
        if (!state.selectedAnswer) return;

        quiz.answerQuestion(state.selectedAnswer);

        if (quiz.hasNextQuestion()) {
            quiz.nextQuestion();

            setState({
                currentQuestion: quiz.getCurrentQuestion(),
                selectedAnswer: null, // Initialize the selected answer.
                score: quiz.getScore(), // Initialize the score.
                hasNext: quiz.hasNextQuestion()
            });
        } else {
            setState((prev) => ({...prev, currentQuestion: null}));
        }
    };

    const { currentQuestion, selectedAnswer, score, hasNext } = state;

    if (!currentQuestion) {
        return (
            <div>
                <h2>Quiz Completed</h2>
                <p>
                    Final Score: {score} out of {quiz.getQuestionsLength()}
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2>Quiz Question:</h2>
            <p>{currentQuestion.question}</p>

            <h3>Answer Options:</h3>
            <ul>
                {currentQuestion.options.map((option) => (
                    <li
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={selectedAnswer === option ? "selected option" : "option"}
                    >
                        {option}
                    </li>
                ))}
            </ul>

            <h3>Selected Answer:</h3>
            <p>{selectedAnswer ?? "No answer selected"}</p>

            <button onClick={handleButtonClick}>{hasNext ? 'Next Question' : 'Submit'}</button>
        </div>
    );
};

export default Quiz;
