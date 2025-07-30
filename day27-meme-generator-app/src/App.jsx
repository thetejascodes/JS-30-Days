import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";

export default function App() {
  const [memeImage, setMemeImage] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const memeRef = useRef(null);

  // Fetch random meme
  const fetchMeme = async () => {
    const res = await fetch("https://meme-api.com/gimme");
    const data = await res.json();
    setMemeImage(data.url);
  };

  // Handle image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setMemeImage(URL.createObjectURL(file));
  };

  // Download meme as image
  const downloadMeme = async () => {
    const canvas = await html2canvas(memeRef.current);
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <h1>😂 Meme Generator</h1>

      {/* Toggle Mode */}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Meme Container */}
      <div className="meme-container" ref={memeRef}>
        {memeImage && <img src={memeImage} alt="meme" />}
        <h2 className="top-text">{topText}</h2>
        <h2 className="bottom-text">{bottomText}</h2>
      </div>

      {/* Inputs */}
      <input type="text" placeholder="Top Text" onChange={(e) => setTopText(e.target.value)} />
      <input type="text" placeholder="Bottom Text" onChange={(e) => setBottomText(e.target.value)} />

      {/* Buttons */}
      <div className="controls">
        <button onClick={fetchMeme}>🔄 New Meme</button>
        <button onClick={downloadMeme}>⬇️ Download</button>
        <input type="file" accept="image/*" onChange={handleUpload} />
      </div>
    </div>
  );
}
