import { getJSONData } from "@/lib/Toolkit";

export async function GET({ params }){
    const { city } = await params;
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},CA&units=metric&appid=${API_KEY}`;

    return getJSONData();
    
}