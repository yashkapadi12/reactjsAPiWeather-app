import React, { useEffect, useState } from "react";
import "./Wheather.css";
import search from "../assets/security.png";
import clear_icon from "../assets/clear_icon.png";
import humidity_icon from "../assets/humidity-icon-2048x1675-xxsge5os.png";
import axios from "axios";

const Wheather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clear_icon,
  };
  const wheatherAPI = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_APP_ID
        }`
      )

      .then((response) => {
        const icon = allIcons[response.data.weather[0].icon] || clear_icon;
        console.log(response.data);
        setWeatherData({
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed,
          temperature: Math.floor(response.data.main.temp),
          location: response.data.name,
          icon: icon,
        });
      });
  };
  useEffect(() => {
    wheatherAPI("Ahmedabad");
  }, []);
  return (
    <div className="wheather">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <img src={search} alt="search" />
      </div>
      <img src={clear_icon} alt="clear" className="weather_icon" />
      <p className="temperature">{weatherData.temperature}&deg;C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.wind}km/h</p>
            <span>Humidity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheather;
