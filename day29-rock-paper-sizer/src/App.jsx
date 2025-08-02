import React, { useState } from "react";
import "./App.css";

const choices = ["rock", "paper", "scissors"];

export default function App() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const playGame = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("Draw!");
    } else if (
      (choice === "rock" && compChoice === "scissors") ||
      (choice === "paper" && compChoice === "rock") ||
      (choice === "scissors" && compChoice === "paper")
    ) {
      setResult("You Win! 🎉");
      setScore(score + 1);
    } else {
      setResult("You Lose! 😢");
      setScore(score - 1);
    }
  };

  const resetGame = () => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setScore(0);
  };

  return (
    <div className="game">
      <h1>✊ ✋ ✌️ Rock Paper Scissors</h1>
      <h2>Score: {score}</h2>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>

      {playerChoice && (
        <div className="result">
          <p>You chose: {playerChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <h3>{result}</h3>
        </div>
      )}

      <button className="reset" onClick={resetGame}>
        🔄 Restart
      </button>
    </div>
  );
}
