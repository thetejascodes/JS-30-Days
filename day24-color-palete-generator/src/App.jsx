import { useState } from "react";
import ColorCard from "./ColorCard";
import "./App.css";

function App() {
  const [colors, setColors] = useState(generateColors());

  function generateColors() {
    return Array.from({ length: 5 }, () => randomColor());
  }

  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  }

  const handleGenerate = () => {
    setColors(generateColors());
  };

  return (
    <div className="container">
      <h1>🎨 Color Palette Generator</h1>
      <div className="palette">
        {colors.map((color, i) => (
          <ColorCard key={i} color={color} />
        ))}
      </div>
      <button onClick={handleGenerate}>Generate New Colors</button>
    </div>
  );
}

export default App;
