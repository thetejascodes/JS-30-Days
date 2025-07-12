const API_KEY = '77b15ae86daf5da15cd2d25c7da4a72f'; 

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const card = document.getElementById("weatherCard");
  const error = document.getElementById("errorMsg");
  const loading = document.getElementById("loading");

  if (!city) {
    error.innerText = "Please enter a city.";
    return;
  }

  card.style.display = "none";
  error.innerText = "";
  loading.style.display = "block";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      error.innerText = "❌ City not found!";
      loading.style.display = "none";
      return;
    }

    const weatherHtml = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <h3>${data.main.temp}°C - ${data.weather[0].main}</h3>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>`;

    card.innerHTML = weatherHtml;
    card.style.display = "block";
    loading.style.display = "none";
  } catch (err) {
    error.innerText = "Something went wrong!";
    loading.style.display = "none";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
