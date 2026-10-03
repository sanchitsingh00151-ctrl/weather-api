import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Wind, Droplets, Sun, Cloud, CloudRain, Snowflake, CloudLightning, CloudFog } from 'lucide-react';
import './index.css';

function App() {
  const [city, setCity] = useState('London');
  const [searchCity, setSearchCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather(searchCity);
  }, [searchCity]);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const geoRes = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
      
      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        setError('City not found. Please try again.');
        setLoading(false);
        return;
      }
      
      const location = geoRes.data.results[0];
      const { latitude, longitude, name, country } = location;
      
      const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
      
      const current = weatherRes.data.current;
      
      setWeatherData({
        name,
        country,
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code
      });
      
    } catch (err) {
      setError('Failed to fetch weather data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchCity(city);
    }
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return <Sun size={64} color="#FFD700" />;
    if (code === 1 || code === 2 || code === 3) return <Cloud size={64} color="#E0E0E0" />;
    if (code === 45 || code === 48) return <CloudFog size={64} color="#B0BEC5" />;
    if (code >= 51 && code <= 67) return <CloudRain size={64} color="#64B5F6" />;
    if (code >= 71 && code <= 77) return <Snowflake size={64} color="#E3F2FD" />;
    if (code >= 95 && code <= 99) return <CloudLightning size={64} color="#FFA000" />;
    return <Sun size={64} color="#FFD700" />;
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear sky';
    if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
    if (code === 45 || code === 48) return 'Foggy';
    if (code >= 51 && code <= 55) return 'Drizzle';
    if (code >= 61 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Unknown';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-5 text-white font-sans">
      <div className="bg-white/10 backdrop-blur-[16px] border border-white/20 rounded-[24px] py-10 px-[30px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-[500px]">
        <div className="flex bg-white/15 rounded-xl px-4 py-3 mb-7 items-center border border-transparent transition-all duration-300 focus-within:border-accent focus-within:bg-white/20">
        <MapPin size={20} className="text-white/70" />
        <input 
          type="text" 
          placeholder="Search for a city..." 
          className="bg-transparent border-none text-white text-base outline-none w-full ml-2.5 font-sans placeholder:text-white/70"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleSearch}
        />
        <Search size={20} className="text-white/70 cursor-pointer" onClick={() => setSearchCity(city)} />
      </div>

      {loading && <div className="text-center text-white/70 py-5 text-base">Fetching weather...</div>}
      
      {error && <div className="text-center text-[#ff6b6b] py-5 text-base">{error}</div>}

      {!loading && !error && weatherData && (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="mb-5">
            {getWeatherIcon(weatherData.weatherCode)}
          </div>
          
          <h1 className="text-[32px] font-semibold mb-1 tracking-tight">{weatherData.name}, {weatherData.country}</h1>
          <p className="text-base text-white/70 capitalize mb-6">{getWeatherDescription(weatherData.weatherCode)}</p>
          
          <div className="text-[72px] font-bold leading-none mb-7 flex items-start bg-gradient-to-b from-white to-[#a8c0ff] bg-clip-text text-transparent">
            {Math.round(weatherData.temperature)}<span className="text-4xl mt-2 ml-1">°C</span>
          </div>

          <div className="flex justify-between w-full pt-6 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-full flex justify-center items-center">
                <Droplets size={24} className="text-accent" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/70 mb-1">Humidity</span>
                <span className="text-base font-semibold">{weatherData.humidity}%</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-full flex justify-center items-center">
                <Wind size={24} className="text-accent" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/70 mb-1">Wind Speed</span>
                <span className="text-base font-semibold">{weatherData.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
