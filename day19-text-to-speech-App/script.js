const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voiceSelect');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');
const speakBtn = document.getElementById('speakBtn');

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Chrome loads voices asynchronously
speechSynthesis.onvoiceschanged = loadVoices;

speakBtn.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);

  utterance.voice = selectedVoice;
  utterance.rate = rateInput.value;
  utterance.pitch = pitchInput.value;

  speechSynthesis.cancel(); // Stop current speech if any
  speechSynthesis.speak(utterance);
});

// Update display values
rateInput.addEventListener('input', () => {
  rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener('input', () => {
  pitchValue.textContent = pitchInput.value;
});
