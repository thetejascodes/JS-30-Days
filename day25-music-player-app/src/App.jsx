import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const songsList = [
  {
    title: "Song One",
    artist: "Artist A",
    src: `${import.meta.env.BASE_URL}songs/song1.mp3`,
    img: `${import.meta.env.BASE_URL}images/art1.jpeg`,
    
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: `${import.meta.env.BASE_URL}songs/song2.mp3`,
    img: `${import.meta.env.BASE_URL}images/art2.jpeg`,
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: `${import.meta.env.BASE_URL}songs/song3.mp3`,
    img: `${import.meta.env.BASE_URL}images/art3.jpeg`,
  },
];

function App() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const currentSong = songsList[currentIndex];

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update Progress Bar
  const updateProgress = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  // Seek Song
  const seekSong = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  // Next Song
  const nextSong = () => {
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * songsList.length));
    } else {
      setCurrentIndex((prev) => (prev + 1) % songsList.length);
    }
  };

  // Previous Song
  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songsList.length) % songsList.length);
  };

  // Handle Song End
  const handleEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  // Change Volume
  const handleVolume = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  useEffect(() => {
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [currentIndex]);

  return (
    <div className="player">
      <h2>🎵 React Music Player</h2>

      {/* Album Art */}
      <img src={currentSong.img} alt="Album Art" className="album-art" />

      {/* Song Info */}
      <h3>{currentSong.title}</h3>
      <p>{currentSong.artist}</p>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={updateProgress}
        onEnded={handleEnded}
      >
        <source src={currentSong.src} type="audio/mp3" />
      </audio>

      {/* Progress Bar */}
      <input
        type="range"
        value={progress}
        onChange={seekSong}
        className="progress-bar"
      />

      {/* Controls */}
      <div className="controls">
        <button onClick={prevSong}>⏮️</button>
        <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
        <button onClick={nextSong}>⏭️</button>
      </div>

      {/* Volume Control */}
      <div className="volume">
        <label>🔊</label>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} />
      </div>

      {/* Extra Buttons */}
      <div className="extra">
        <button onClick={() => setShuffle(!shuffle)} className={shuffle ? "active" : ""}>
          🔀 Shuffle
        </button>
        <button onClick={() => setRepeat(!repeat)} className={repeat ? "active" : ""}>
          🔁 Repeat
        </button>
      </div>
    </div>
  );
}

export default App;
