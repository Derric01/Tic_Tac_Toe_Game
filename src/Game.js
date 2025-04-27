import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [winner, setWinner] = useState(null); // Initialize winner state

  const handleClick = (i) => {
    // Prevent clicking if game is won or square is already filled
    if (winner || history[stepNumber]?.squares[i]) return;

    const newHistory = history.slice(0, stepNumber + 1);
    const squares = newHistory[newHistory.length - 1].squares.slice();
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

    // Check for winner after the move
    const currentWinner = calculateWinner(squares);
    if (currentWinner) {
      setWinner(currentWinner); // Set winner only if there's a winner
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
        return squares[a]; // Return 'X' or 'O' as the winner
      }
    }
    return null; // No winner
  };

  const handleReset = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    setWinner(null); // Reset winner on game reset
  };

  const currentSquares = history[stepNumber] ? history[stepNumber].squares : Array(9).fill(null);

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="status">
        {winner
          ? `Winner: ${winner}`
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
