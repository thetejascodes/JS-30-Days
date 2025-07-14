const adviceButton = document.getElementById("getAdviceButton");
const result = document.getElementById('result');
const loader = document.getElementById('loading');
const toggle = document.getElementById("modeToggle");
const getAdvice = async ()=>{
    result.innerHTML = "";
    loader.style.display = "block";
    try {
        const response = await fetch(`https://api.adviceslip.com/advice`);
        if(!response.ok){
            result.innerText = `HTTP error! Status: ${response.status}`
        }
        const data = await response.json();
        console.log(data.slip.advice)

        
        result.innerHTML = `<p>${data.slip.advice}</p>`
        loader.style.display = "none";

    } catch (error) {
        loader.style.display = "none"
        result.innerText = "Something Went ❌ Wrong";
    }
}
toggle.addEventListener("change",()=>{
    document.body.classList.toggle("light-mode",!toggle.checked)
})

adviceButton.addEventListener("click",getAdvice);