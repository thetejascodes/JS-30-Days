const clock = document.getElementById("clock");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function updateTime() {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
updateTime(); // Call once immediately

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});
