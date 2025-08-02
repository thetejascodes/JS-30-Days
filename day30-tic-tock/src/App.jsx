import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <h1>🎮 Tic Tac Toe</h1>
      <div className="board">
        {squares.map((val, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {val}
          </button>
        ))}
      </div>
      <h2>{winner ? `🏆 Winner: ${winner}` : `Next: ${xIsNext ? "X" : "O"}`}</h2>
      <button className="reset" onClick={resetGame}>🔄 Restart</button>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}
