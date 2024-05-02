
import React from 'react';

const Question = ({ question }) => {
  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
   backgroundColor: '#3887c7'
  };

  return (
    <div className="question-container">
      <h3 style={headingStyle}>Q.{question.question}</h3>
    </div>
  );
};

export default Question;
