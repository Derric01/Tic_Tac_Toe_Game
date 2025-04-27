import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false); // NEW

  const handleClick = (i) => {
    if (winner || history[stepNumber]?.squares[i] || isDraw) return;

    const newHistory = history.slice(0, stepNumber + 1);
    const squares = newHistory[newHistory.length - 1].squares.slice();
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

    const currentWinner = calculateWinner(squares);
    if (currentWinner) {
      setWinner(currentWinner);
      setIsDraw(false); // no draw if winner
    } else if (!squares.includes(null)) {
      setIsDraw(true); // if no winner and no empty cells -> draw
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleReset = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false); // reset draw too
  };

  const currentSquares = history[stepNumber] ? history[stepNumber].squares : Array(9).fill(null);

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="status">
        {winner
          ? `Winner: ${winner} 🔥`
          : isDraw
          ? "It's a Draw! 🤝"
          : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <Board squares={currentSquares} onClick={handleClick} />
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

export default Game;
