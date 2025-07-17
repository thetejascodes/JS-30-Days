const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

guessBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "⛔ Enter a valid number between 1 and 100!";
    return;
  }

  attempts--;

  if (guess === randomNumber) {
    message.textContent = `🎉 Correct! You guessed it!`;
    endGame();
  } else if (attempts === 0) {
    message.textContent = `💥 Game Over! The number was ${randomNumber}`;
    endGame();
  } else if (guess < randomNumber) {
    message.textContent = "📉 Too low!";
  } else {
    message.textContent = "📈 Too high!";
  }

  attemptsDisplay.textContent = `Attempts Left: ${attempts}`;
  guessInput.value = "";
});

function endGame() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
}
