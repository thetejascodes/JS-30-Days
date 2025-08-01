import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleClick = () => {
    if (!isRunning && timeLeft === 5) setIsRunning(true);
    if (isRunning) setClicks((c) => c + 1);
  };

  const resetGame = () => {
    setClicks(0);
    setTimeLeft(5);
    setIsRunning(false);
  };

  return (
    <div className="app">
      <h2>⚡ Click Speed Tester</h2>
      <p>Time Left: {timeLeft}s</p>
      <p>Total Clicks: {clicks}</p>
      <p>CPS: {timeLeft === 0 ? (clicks / 5).toFixed(2) : "?"}</p>

      <button className="click-btn" onClick={handleClick} disabled={timeLeft === 0}>
        CLICK ME FAST!
      </button>

      {timeLeft === 0 && <button onClick={resetGame}>🔄 Restart</button>}
    </div>
  );
}
