"use client";

export default function CitySelector({ cities, selectedCity, onSelect, error }) {

    return (
        <div id="s-city-menu">
            <div>{ error ? "No city data available" : "Select a Canadian city to see the current weather"}</div>
            <select value={selectedCity} onChange={(e) => onSelect(e.target.value)}>
                {error ? <option>No Data</option>
                : cities.map(city => (
                    <option key={city.name} value={city.name}>
                        {city.name}, {city.province}
                    </option>
                ))}
            </select>
        </div>
    );
}