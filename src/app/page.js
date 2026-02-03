"use client";

import { useEffect, useState } from "react";
import CitySelector from "./components/CitySelector";
import { getJSONData } from "@/lib/Toolkit";
import Loadingoverlay from "./components/LoadingOverlay";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails";

const CITIY_SCRIPT = "/cities.json";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWetherData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchWeather = (city) => {
    const WEATHER_SCRIPT = `/api/weather?city=${city}`;

    setUpdating(true);
    getJSONData(weatherScript, handleWeatherSuccess, handleError);
  };
  
  const handleCityChange = (city) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);

    fetchWeather(city);
  };

  const handleCitySuccess = (data) => {
    setCities(data.data.cities);
    
    // load last selected city from browser storage
    const savedCity = localStorage.getItem("selectedCity");
    // or select first city in list
    const cityToSelect = savedCity || data.data.cities[0].name;
    
    if (cityToSelect) {
      setSelectedCity(cityToSelect);
      fetchWeather(cityToSelect);
    }
  };

  const handleWeatherSuccess = (data) => {
    if (data.cod === "404") {
      setError("City not found");
      setWetherData(null);
    } else {
      setWetherData(data);
      setError(null);
    }
    setLoading(false);
    setUpdating(false);

    console.log(data);
  };

  const handleError = (error) => {
    console.error("Error loading cities:", error);
    setError(error.message);
    setLoading(false);
    setUpdating(false);
  };

  // load city data from .json
  useEffect(() => {
    getJSONData(CITIY_SCRIPT, handleCitySuccess, handleError);
  }, []);

  return (
    <>
      {loading && <Loadingoverlay />}

      <div className="g-base">
        <header className="g-banner">
          <div className="g-heading">Weather Report</div>
          <div className="g-sub-heading">
            By James R Wilson |&nbsp;
            <a href="https://github.com/notyourunclebob" target="_blank"
              >Github</a
            >
          </div>
        </header>

        <main>
          <CitySelector cities={cities} selectedCity={selectedCity} onSelect={handleCityChange} error={error}/>

          <WeatherDisplay 
            weather={weatherData?.weather?.[0] || null} 
            city={selectedCity} 
            province={cities.find(c => c.name === selectedCity)?.province}
          />

          <WeatherDetails weatherData={weatherData} />
        </main>

        <footer>
            Powered by{' '}
            <a href="http://openweathermap.org/" target="_blank" rel="noopener noreferrer">
              openweathermap
            </a>
            {' | '}
            <a href="http://erikflowers.github.io/weather-icons/" target="_blank" rel="noopener noreferrer">
              weather-icons
            </a>
        </footer>
      </div>
    </>
  );
};
