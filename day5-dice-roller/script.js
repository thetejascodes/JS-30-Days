console.log('dice roller script loaded')
document.addEventListener('keydown',(event)=>{
    console.log(event.key)
    if(event.key === ' '){
        console.log('space key pressed')
        const diceImage = document.getElementById('diceImage');
        const randomNumber = Math.floor(Math.random() * 6) +1;
        console.log(randomNumber)
        diceImage.src = `images/dice${randomNumber}.png`;
        const audio = document.getElementById('audio');
        audio.play();
        diceImage.classList.add('roll');
        setTimeout(() => {
            diceImage.classList.remove('roll');
        },200)

    }
})