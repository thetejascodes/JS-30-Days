import React, { useEffect, useState } from "react";
import "./App.css";
import clickSoundFile from "./click.mp3"; // add your sound file

const App = () => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("counter");
    return saved !== null ? parseInt(saved) : 0;
  });

  const [customValue, setCustomValue] = useState("");
  const [autoIncrement, setAutoIncrement] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("counter", count);
  }, [count]);

  // Auto increment logic
  useEffect(() => {
    let interval;
    if (autoIncrement) {
      interval = setInterval(() => {
        setCount((prev) => prev + 1);
        playClickSound();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoIncrement]);

  // Play click sound
  const playClickSound = () => {
    const audio = new Audio(clickSoundFile);
    audio.play();
  };

  // Dynamic background color
  const getBgColor = () => {
    if (count > 0) return "#d4fcd4";
    if (count < 0) return "#ffd6d6";
    return "#f4f4f4";
  };

  return (
    <div className="app-container" style={{ backgroundColor: getBgColor() }}>
      <h1>🔥 React Counter App</h1>
      <div className="counter">{count}</div>

      <div>
        <button onClick={() => { setCount(count + 1); playClickSound(); }}>➕ Increment</button>
        <button onClick={() => { setCount(count - 1); playClickSound(); }}>➖ Decrement</button>
        <button onClick={() => { setCount(0); playClickSound(); }}>🔄 Reset</button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <input
          type="number"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Enter value"
        />
        <button
          onClick={() => {
            if (customValue !== "") {
              setCount(Number(customValue));
              playClickSound();
            }
          }}
        >
          Set
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setAutoIncrement(!autoIncrement)}>
          {autoIncrement ? "⏹️ Stop Auto-Increment" : "▶️ Start Auto-Increment"}
        </button>
      </div>
    </div>
  );
};

export default App;
