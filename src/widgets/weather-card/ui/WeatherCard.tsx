import { WeatherData } from '@entities/weather/model/types';

interface WeatherCardProps {
  weatherData: WeatherData;
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2>{weatherData.name}</h2>
      <p>온도: {weatherData.main.temp}°C</p>
      <p>체감 온도: {weatherData.main.feels_like}°C</p>
      <p>습도: {weatherData.main.humidity}%</p>
    </div>
  );
}
