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

    const storedData = localStorage.getItem('quizData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCurrentQuestionIndex(parsedData.currentQuestionIndex);
      setAnswers(parsedData.answers);
      setViolationCount(parsedData.violationCount);
      setMarks(parsedData.marks);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const quizData = { currentQuestionIndex, answers, violationCount, marks };
    localStorage.setItem('quizData', JSON.stringify(quizData));
  }, [currentQuestionIndex, answers, violationCount, marks]);

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      setViolationCount((prevCount) => prevCount + 1);
      alert('You switched to another tab. This counts as a violation.');
    }
  };

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
    localStorage.removeItem('quizData'); 
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
