import React, {useState, useEffect} from "react";
import './WeatherApp.css';

import clear from '../Assets/clear.png';
import clouds from '../Assets/clouds.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import mist from '../Assets/mist.png';
import rain from '../Assets/rain.png';
import search from '../Assets/search.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png'


function WeatherApp () {

    let api_key = process.env.REACT_APP_API_KEY;

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState({})

    const images = {
        clear: clear, 
        clouds: clouds, 
        drizzle: drizzle, 
        mist: mist, 
        rain: rain, 
        snow: snow
    };

    const fetchData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
            if (!response.ok) {
                throw new Error ('Unable to fetch data')
            }
            const data = await response.json();
            console.log(data)
            const name = data.name;
            const KelvinTemp = data.main.temp;
            const temperature = (KelvinTemp - 273.15).toFixed(1);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const type = data.weather[0].main.toLowerCase();
            const icon = images[type];
            setWeatherData({name, temperature, humidity, windSpeed, icon})
        } 
        catch (error) {
            console.error(error)
        }
    } 

    useEffect(()=> {
       fetchData('London')  
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className="app-container">
            <div className="top-bar">
                <input type="text" placeholder={weatherData.name} className="cityInput" value={city} onChange={(e)=> setCity(e.target.value)}/>
                <div className="search-icon" onClick={()=> fetchData(city)}>
                    <img src={search} alt=''/>
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherData.icon} alt=""/>
            </div>
            <div className="weather-temp">{weatherData.temperature}°C</div>
            <div className="weather-location">{weatherData.name}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity} alt=""/>
                    <div className="data">
                        <div className="humidity-percentage">{weatherData.humidity}%</div>
                        <div className="text">Humidity</div>
                      </div>      
                </div>
                <div className="element">
                    <img src={wind} alt=""/>
                    <div className="data">
                        <div className="wind-speed">{weatherData.windSpeed}km/h</div>
                        <div className="text">Wind Speed</div>
                      </div>      
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
