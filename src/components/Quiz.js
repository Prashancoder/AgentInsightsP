import React, { useState, useEffect } from 'react';
import questionsData from '../questions.json'; 
import Question from './Question';
import Result from './Result';
import Options from './Options';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [violationCount, setViolationCount] = useState(0);
  const [marks, setMarks] = useState(0);

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setAnswers([...answers, { questionId: currentQuestion.id, selectedAnswer, isCorrect }]);
    if (isCorrect) {
      setMarks((prevMarks) => prevMarks + 1); 
    }
    handleNextQuestion();
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setViolationCount(0);
    setMarks(0);
  };

  return (
    <div className="quiz-container">
      {currentQuestionIndex < questions.length ? (
        <>
          <Question question={questions[currentQuestionIndex]} />
          <Options
            options={questions[currentQuestionIndex].options}
            onAnswerSelect={handleAnswerSelect}
          />
          <button onClick={handleNextQuestion}></button>
        </>
      ) : (
        <Result
          answers={answers}
          marks={marks}
          violationCount={violationCount}
          onReset={handleResetQuiz}
        />
      )}
    </div>
  );
};

export default Quiz;
