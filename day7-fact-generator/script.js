const getFact = async () => {
    const fact = document.getElementById("fact");
    const loading = document.getElementById("loading");

    fact.textContent = "";
    loading.style.display = "block";
    try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json();
        fact.textContent = `${data.text}`
    } catch (error) {
        fact.textContent = `${error.message}`;
    }
    finally{
        loading.style.display = "none"
    }
}



const factButton = document.getElementById('fact-Button');
const copyFact = () =>{
    window.navigator.clipboard.writeText(document.getElementById("fact").textContent)
}
factButton.addEventListener("click", getFact);
