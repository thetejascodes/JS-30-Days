const getJoke = async () => {
    console.log("Fetching joke...");
    
    const setupEl = document.getElementById('joke-setup');
    const punchlineEl = document.getElementById('joke-punchline');
    const loading = document.getElementById('loading');

    setupEl.textContent = "";
    punchlineEl.textContent = "";
    loading.style.display = "block";

    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setupEl.textContent = data.setup;
        punchlineEl.textContent = data.punchline;
        console.log(data);
    } catch (error) {
        setupEl.textContent = "Oops! Failed to load joke.";
        console.error("Error fetching joke:", error);
    } finally {
        loading.style.display = "none";
    }
};

const jokeButton = document.getElementById('joke-button');
jokeButton.addEventListener("click", getJoke);
