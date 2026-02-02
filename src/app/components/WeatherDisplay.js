"use client";

export default function WeatherDisplay({ weather, city, province }) {

    return (
        <div className="s-weather">
            <i className={weather ? `wi wi-owm-${weather.id}` : "wi wi-na"}></i>
            <div id="weather-description">{weather ? weather.description : "No data for selected city"}</div>
            <div id="selected-city">
               {city? `${city} : ${province}` : "No city selected"}
            </div>
        </div>
    );
}