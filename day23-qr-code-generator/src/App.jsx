import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [input, setInput] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const generateQR = () => {
    if (input.trim() === "") return;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      input
    )}`;
    setQrUrl(url);
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "QRCode.png";
    link.click();
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>QR Code Generator</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or URL"
      />

      <button onClick={generateQR} className="btn generate">Generate QR</button>

      {qrUrl && (
        <div className="qr-section">
          <img src={qrUrl} alt="QR Code" />
          <button onClick={downloadQR} className="btn download">Download QR</button>
        </div>
      )}

      <button onClick={() => setDarkMode(!darkMode)} className="btn toggle">
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default App;
