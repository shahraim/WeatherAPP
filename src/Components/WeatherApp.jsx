import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [name, setName] = useState("");
  const [cloudy, setCloudy] = useState(false);
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const apiKey = "aad04773b0b2b7b7c3c7a4918c583f59";
  // const apiKey = process.env.REACT_APP;
  // console.log(apiKey);

  const [currentTime, setCurrentTime] = useState(new Date());

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`;
  function apiCall() {
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
        setWeatherData(res.data);
        let data = res.data.weather[0].main;
        if (data === "Clear") {
          setCloudy("clear_day");
        } else if (data === "Haze") {
          setCloudy("mist");
        } else if (data === "Clouds") {
          setCloudy("filter_drama");
        } else if (data === "Rain") {
          setCloudy("rainy");
        } else if (data === "Drizzle") {
          setCloudy("rainy_light");
        } else {
          setCloudy("partly_cloudy_day");
        }
        setName("");
        const currentTimeMillis = new Date().getTime();
        const sunriseMillis = res.data.sys.sunrise * 1000;
        const sunsetMillis = res.data.sys.sunset * 1000;
        const isDay =
          currentTimeMillis >= sunriseMillis &&
          currentTimeMillis < sunsetMillis;
        setIsDay(isDay);
      })
      .catch((err) => {
        if (err.response) {
          console.log("API Error Response:", err.response);
          if (err.response.status === 401) {
            // console.error("API Error: Unauthorized");
            toast.error("API Error: Unauthorized");
          } else {
            // console.error("API Error:", err.response.data.message);
            toast.error(`API Error: ${err.response.data.message}`);
          }
        } else {
          // console.error("Network Error:", err.message);
          toast.error("Network Error: Please check your internet connection");
        }
        setError(name);
        setCloudy(false);
        setName("");
        setWeatherData(null);
      });
  }
  function updateCurrentTime() {
    setCurrentTime(new Date());
  }
  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="mainContainer">
      <div className="leftSide">
        <div className="searchArea">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Search any city"
            value={name}
          />
          <button onClick={apiCall}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <div className="conditionArea">
          {weatherData && weatherData.name ? (
            <div className="dataArea">
              <div>
                <h1>{weatherData.name}</h1>
                <span
                  className={`material-symbols-outlined ${
                    isDay ? "sunIcon" : "moonIcon"
                  }`}
                >
                  {isDay ? "light_mode" : "nights_stay"}
                </span>
              </div>
              <ul>
                <span className="countryName">{weatherData.sys.country}</span>
                <li>
                  <span>Humidity</span>
                  <span>{weatherData.main.humidity}</span>
                </li>
                <li>
                  <span>Temperature</span>
                  <span>{weatherData.main.temp} K</span>
                </li>
                <li>
                  <span> Wind Speed</span>
                  <span>{weatherData.wind.speed} Km/h</span>
                </li>
                <li>
                  <span>Condition</span>
                  <span>{weatherData.weather[0].description}</span>
                </li>
              </ul>
            </div>
          ) : (
            <p>
              {error
                ? `No search found ${error}`
                : "What is a Weather Lets Check Out."}
            </p>
          )}
        </div>
        <div className="develop">
          <p>
            <a href="https://shahraim-portfolio.vercel.app/" target="blank">
              Designed and Developed by
              <span className="coolText">Shahraim_Khan</span>
            </a>
          </p>
        </div>
      </div>
      <div className="rightSide">
        <div className="dateAndTime">
          <div className="week">
            {new Date().toLocaleDateString(undefined, { weekday: "long" })}
          </div>
          <div className="time">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
        <div className="cloudIcon">
          <span className="material-symbols-outlined">{cloudy}</span>
        </div>
      </div>
      <div className="socialArea">
        <a href="https://github.com/shahraim/WeatherAPP" target="_blank">
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/shahraim-khan-2280ab26b/"
          target="_blank"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://www.instagram.com/shahraim_graphy" target="_blank">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};
