export default function WeatherDetails ({ weatherData }) {
    if(!weatherData) return null;

    const main = weatherData.main;
    const visibility = weatherData.visibility;
    const wind = weatherData.wind;

    return (
        <div id="p-report-details">
            <div className="s-temperature">
                <div id="header">
                    <i className="wi wi-thermometer"></i> Temperature
                </div>
                <div id="report">
                    Current: {main.temp.toFixed(2)}°C <br />
                    Low: {main.temp_min.toFixed(2)}°C <br />
                    High: {main.temp_max.toFixed(2)}°C <br />
                    Feels like: {main.feels_like.toFixed(2)}°C
                </div>
            </div>
            <div className="s-visibility">
                <div id="header">
                    <i className="wi wi-horizon-alt"></i>
                    Visibility
                </div>
                <div id="report">{visibility}</div>
            </div>
            <div className="s-humidity">
                <div id="header">
                    <i className="wi wi-humidity"></i> Humidity
                </div>
                <div id="report">{main.humidity}%</div>
            </div>
            <div className="s-pressure">
                <div id="header">
                    <i className="wi wi-barometer"></i> Air Pressure
                </div>
                <div id="report">{main.pressure} hPa</div>
            </div>
            <div className="s-wind">
                <div id="header">
                    <i className={`wi wi-wind towards-${wind.deg}-deg`}></i> Wind
                </div>
                <div id="report">
                    Direction: {wind.deg}°<br />
                    Speed: {wind.speed} m/sec
                </div>
            </div>
        </div>
    );
}