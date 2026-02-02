"use client";

export default function CitySelector({ cities, selectedCity, onSelect }) {

    return (
        <div id="s-city-menu">
            <div>Select a Canadian city to see the current weather</div>
            <select value={selectedCity} onChange={(e) => onSelect(e.target.value)}>
                {cities.map(city => (
                    <option key={city.name} value={city.name}>
                        {city.name}, {city.province}
                    </option>
                ))}
            </select>
        </div>
    );
}