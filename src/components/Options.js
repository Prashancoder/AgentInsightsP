import React, { useState } from 'react';

const Options = ({ options, onAnswerSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    onAnswerSelect(selectedOption); 
    setSelectedOption(''); 
  };

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionClick(option)}
            />
            {option}
          </label>
          <br /> 
        </div>
      ))}
      <button
        onClick={handleNextQuestion}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Options;
