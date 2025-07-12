const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");
const movieResult = document.getElementById("movie-results")

searchButton.addEventListener("click", async () => {
  try {
    const query = document.getElementById("search-input").value.trim();
    if (!query) return;
    movieResult.innerHTML = "";
    errorMessage.classList.add("hidden")
    loader.classList.remove("hidden")
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=a053b4f6&s=${query}`);
    const data = await response.json();
    loader.classList.add("hidden");

    if(data.Response === "True"){
      displayMovies(data.Search);
    }
    else{
      errorMessage.classList.remove("hidden");
      errorMessage.textContent = "No Movies Found.";
    }
  } catch (error) {
    loader.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "Something Went Wrong. Try again"
  }
})

const displayMovies = (movies)=>{
  console.log("displayMovies")
  movies.forEach(movie => {
    console.log(movie.Poster)
    const card = document.createElement('div')
    card.className = 'movie-card'
    card.innerHTML = `<img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x270'}" alt="${movie.Title}">
    <h3>${movie.Title}</h3>
    <p>Year: ${movie.Year}</p>
    <p>Type: ${movie.Type}</p>`
    movieResult.appendChild(card);
  });
}