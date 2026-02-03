import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  
  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},CA&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}