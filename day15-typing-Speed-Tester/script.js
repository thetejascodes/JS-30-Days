const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed is a useful skill in the digital age.",
  "Practice makes perfect when it comes to typing.",
  "JavaScript adds interactivity to websites.",
  "This is a sample sentence for the typing test."
];

let sentence = "";
let startTime, started = false;

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const bestWpmEl = document.getElementById("best-wpm");
const progressBar = document.getElementById("progress-bar");

function loadSentence() {
  sentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.textContent = sentence;
  inputEl.value = "";
  inputEl.focus();
  started = false;
  timeEl.textContent = "";
  wpmEl.textContent = "";
  accuracyEl.textContent = "";
  progressBar.style.width = "0%";
}

inputEl.addEventListener("input", () => {
  if (!started) {
    startTime = new Date();
    started = true;
  }

  const typed = inputEl.value.trim();
  const target = sentence;

  // live feedback progress
  const progress = Math.min((typed.length / target.length) * 100, 100);
  progressBar.style.width = `${progress}%`;

  // live input feedback coloring (optional)
  inputEl.style.borderColor = sentence.toLowerCase().startsWith(typed.toLowerCase()) ? "#4caf50" : "#ff4d4d";

  if (typed.toLowerCase() === target.toLowerCase()) {
    const endTime = new Date();
    const totalTime = (endTime - startTime) / 1000; // in seconds
    const wordCount = target.split(" ").length;
    const wpm = Math.round((wordCount / totalTime) * 60);

    const correctChars = typed.split("").filter((char, i) =>
      char.toLowerCase() === target[i]?.toLowerCase()).length;

    const accuracy = ((correctChars / target.length) * 100).toFixed(1);

    timeEl.textContent = `🕒 Time: ${totalTime.toFixed(2)} sec`;
    wpmEl.textContent = `⌨️ WPM: ${wpm}`;
    accuracyEl.textContent = `✅ Accuracy: ${accuracy}%`;

    // Best WPM tracking
    const bestWPM = localStorage.getItem("bestWPM");
    if (!bestWPM || wpm > parseInt(bestWPM)) {
      localStorage.setItem("bestWPM", wpm);
    }
    bestWpmEl.textContent = `🏅 Best WPM: ${localStorage.getItem("bestWPM")}`;

    // auto-load new sentence
    setTimeout(loadSentence, 2500);
  }
});

function restartTest() {
  loadSentence();
}

function copyResult() {
  const wpm = wpmEl.textContent;
  const acc = accuracyEl.textContent;
  const time = timeEl.textContent;

  const result = `${wpm}\n${acc}\n${time}`;
  navigator.clipboard.writeText(result)
    .then(() => alert("Result copied!"))
    .catch(() => alert("Failed to copy."));
}

window.onload = () => {
  loadSentence();
  const bestWPM = localStorage.getItem("bestWPM");
  if (bestWPM) {
    bestWpmEl.textContent = `🏅 Best WPM: ${bestWPM}`;
  }
};
