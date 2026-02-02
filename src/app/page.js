"use client";

import { useEffect, useState } from "react";
import CitySelector from "./components/CitySelector";
import { getJSONData } from "@/lib/Toolkit";
import Loadingoverlay from "./components/LoadingOverlay";
import WeatherDisplay from "./components/WeatherDisplay";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWetherData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},CA&units=metric&appid=${API_KEY}`;

    setUpdating(true);
    getJSONData(url, handleWeatherSuccess, handleError);
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
    const cityToSelect = savedCity || cities[0].name;
    
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
  };

  const handleError = (error) => {
    console.error("Error loading cities:", error);
    setError(error.message);
    setLoading(false);
    setUpdating(false);
  };

  // load city data from .json
  useEffect(() => {
    getJSONData("/api/cities", handleCitySuccess, handleError);
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
          <CitySelector cities={cities} selectedCity={selectedCity} onSelect={handleCityChange} />

          <WeatherDisplay 
            weather={weatherData?.weather?.[0] || null} 
            city={selectedCity} 
            province={cities.find(c => c.name === selectedCity)?.province}/>
        </main>
      </div>
    </>
  );
};
