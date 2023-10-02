
import React, {useState} from 'react' ;
import "./weather.css" ;



function Weather() {

    const [input, setInput] = useState("");
    const [apiData, setApiData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const API = {
        url: "https://api.openweathermap.org/data/2.5/",
        key: "a628fe54f59d600f890e66c90ed9efa2"
    };


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date();
    let today_date = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` 



    const getInput = (e) =>{
        setInput(e.target.value);
    };


    const getWeatherData = (e) =>{

        if(input.trim() == ""){
            e.preventDefault();
            setErrorMsg("Input Can Not Be Empty");
            setError(true);

        }else{
            e.preventDefault();

            setIsLoading(true);
            setError(true);

            fetch(`${API.url}weather?q=${input}&units=metric&APPID=${API.key}`)
            .then((res)=>{
                
                if(!res.ok){
                    throw Error (`Something Went Wrong, may be the connection or the spelling ...`)
                }

                return res.json();
            })
            .then((data)=>{
                
                setApiData(data);
                setInput("");

                setIsLoading(false);
                setError(false);
            })
            .catch((err)=>{
                setError(true);
                setErrorMsg(err.message);
                setIsLoading(false);
            })
        }
    };


  return (
    <div className="weather">
        <div className="container">
            <div className="weather-app">
                <h1>Weather App</h1>
                <p className="date">{today_date}</p>
                <form  onSubmit={getWeatherData}>
                    <input 
                    type="text" 
                    placeholder='Type a city name then press "Enter".'
                    onChange={getInput} 
                    value={input}
                    />
                </form>
                
                {

                isLoading ? (
                    <h3 className="loading">Loading ...</h3>
                ) 
                 
                : error ? (
                    <div className={errorMsg != "" ? "error shown" : "error"} >{errorMsg}</div>
                )
                
                : (
                    <div className="result">
                        
                        <h2>{apiData.name}, {apiData.sys.country}</h2>
                        <div className="icon">
                            <img src={`https://openweathermap.org/img/wn/${apiData.weather[0].icon}.png`} alt={apiData.weather[0].main}  />
                        </div>
                        <div className="info">
                            <p>Temp: {Math.round(apiData.main.temp)}℃</p>
                            <p>Weather: {apiData.weather[0].main}</p>
                            <p>Humidity: {apiData.main.humidity}%</p>
                        </div>
                    </div>
                )}

                <footer>Made by <a href="https://www.linkedin.com/in/mohamedfiky/" target="_blank">M-Fiky</a></footer>

            </div>
        </div>
    </div>
  )
}

export default Weather


// https://openweathermap.org/current
// https://openweathermap.org/weather-conditions#How-to-get-icon-URL
// https://openweathermap.org/img/wn/10d.png