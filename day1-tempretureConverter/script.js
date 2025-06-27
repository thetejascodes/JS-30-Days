const getTempreture = ()=>{
    let tempretureInCelcius = document.getElementById("tempreture").value;
    let fahrenheit = (tempretureInCelcius * 9/5) + 32;
    console.log(isNaN(fahrenheit));
    if(isNaN(fahrenheit)){
        console.log("Please enter")
        document.getElementById("result").innerHTML = "❌ Please enter a valid number";
      
    }
    else{
        document.getElementById("result").innerHTML = `✅ The temreture is =  ${fahrenheit}°F`;
    }
    
}