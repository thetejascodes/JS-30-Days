const API_KEY = '77b15ae86daf5da15cd2d25c7da4a72f'; 
const getWeather = async ()=>{
  const city = document.getElementById("cityInput").value.trim();
  const loading = document.getElementById("loading");
  const erroMessage = document.getElementById("errorMsg");
  const card = document.getElementById("weatherCard");
  if(!city)return;
  card.style.display = "none";
  erroMessage.innerText = "";
  loading.style.display = "block";
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    if(data.cod !== 200){
      erroMessage.innerText = "❌ City Not Found";
      loading.style.display = "none";
      return;
    }
    console.log(data)
    const weatherCard = `
    <h2>${data.name}, ${data.sys.country}</h2>
      <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <h3>${data.main.temp}°C - ${data.weather[0].main}</h3>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>`;
      card.innerHTML = weatherCard;
      card.style.display = "block";
      loading.style.display = "none"

  } catch (error) {
    error.innerText = "Something went wrong!";
    loading.style.display = "none";
  }
}

const toggleTheme = ()=>{
  document.body.classList.toggle("dark")
}


