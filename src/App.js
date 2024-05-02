import React from 'react';
import Quiz from './components/Quiz';
import './App.css'; 


const App = () => {
  return (
    <div className="app-container">
      <div className="app-containerr"><h1>Quiz App</h1></div>
      <Quiz />
    </div>
  );
};

export default App;
