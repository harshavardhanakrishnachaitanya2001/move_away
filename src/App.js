
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Game from './components/Game';

const App = () => {
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (score === 100 && !gameComplete) {
      setGameComplete(true);
    }
  }, [score, gameComplete]);

  return (
    <div className='mx-auto bg-black h-screen'>
      <Header score={score} gameComplete={gameComplete} />
      <Game score={score} setScore={setScore} setGameComplete={setGameComplete} gameComplete={gameComplete} />
    </div>
  );
};

export default App;
