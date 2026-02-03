export default async function GET(req, res) {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},CA&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}