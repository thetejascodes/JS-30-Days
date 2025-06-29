let toggleButton  = document.getElementById("toggle-button")

if(localStorage.getItem("dark-mode")){
    document.getElementById("body").classList.add("dark-mode");
    toggleButton.textContent = "☀️"
}

toggleButton.addEventListener("click",() =>{
    let body = document.getElementById("body")
    body.classList.contains("dark-mode") ? 
    (body.classList.remove("dark-mode"),toggleButton.textContent = "🌙",localStorage.removeItem("dark-mode"))  : (body.classList.add("dark-mode"),toggleButton.textContent = "☀️",localStorage.setItem("dark-mode","true"))

})