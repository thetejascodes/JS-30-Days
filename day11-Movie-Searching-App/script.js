

const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const movieResults = document.getElementById("movie-results");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  movieResults.innerHTML = "";
  errorMessage.classList.add("hidden");
  loader.classList.remove("hidden");

  fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=a053b4f6&s=${query}`)
    .then(res => res.json())
    .then(data => {
      loader.classList.add("hidden");

      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "No movies found.";
      }
    })
    .catch(() => {
      loader.classList.add("hidden");
      errorMessage.classList.remove("hidden");
      errorMessage.textContent = "Something went wrong. Try again.";
    });
});

function displayMovies(movies) {
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x270'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
    `;
    movieResults.appendChild(card);
  });
}
