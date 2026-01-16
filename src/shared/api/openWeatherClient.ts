import axios from 'axios';

export const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/',
});
