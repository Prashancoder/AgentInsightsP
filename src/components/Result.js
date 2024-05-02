import React, { useState } from 'react';

const Result = ({ answers, marks, violationCount, onReset }) => {
  const [ setResetQuiz] = useState(false);

  const handleReset = () => {
    onReset();
    
    setResetQuiz(true);
  };

  return (
    <div className="result-container">
      <h2>Your Quiz Results</h2>
      <p>Marks: {marks}</p>
      <p>Violation Count: {violationCount}</p>
      
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            Question ID: {answer.questionId}, Selected Answer: {answer.selectedAnswer}, Correct: {answer.isCorrect ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>
        Reset Quiz
      </button>
          </div>
  );
};

export default Result;
