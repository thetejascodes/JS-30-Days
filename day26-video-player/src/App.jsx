import React, { useState } from "react";
import "./App.css";

const videos = [
  { title: "YouTube Video 1", type: "youtube", src: "https://www.youtube.com/embed/Oc6pJrJdfVQ" },
  { title: "YouTube Video 2", type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentVideo = videos[currentIndex];

  const nextVideo = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);

  return (
    <div className="player">
      <h2>🎥 Custom Video Player</h2>

      {currentVideo.type === "youtube" ? (
        <iframe
          width="640"
          height="360"
          src={currentVideo.src}
          title={currentVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video width="640" controls>
          <source src={currentVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="controls">
        <button onClick={prevVideo}>⏮ Previous</button>
        <button onClick={nextVideo}>⏭ Next</button>
      </div>
    </div>
  );
}
