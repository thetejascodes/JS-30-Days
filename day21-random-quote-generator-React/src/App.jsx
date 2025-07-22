import React, { useEffect, useState } from "react";
import './App.css'

const App = () => {
  const quotes = [
    "Success is not final; failure is not fatal.",
    "Stay hungry, stay foolish.",
    "Your time is limited, don't waste it living someone else's life.",
    "Push yourself, because no one else is going to do it for you.",
  ];
  console.log("hello");
  const [quote,setQuote] = useState("Get Random Quote");
  const getQuote = ()=>{
     const randomNumber = Math.floor(Math.random()*quotes.length);
    setQuote(quotes[randomNumber]);
    console.log(quote)
  }
  return (
    <div className="app">
      <h2>{quote}</h2>
     <button onClick={getQuote}>Get New Quote</button>
    </div>
  );
};

export default App;
