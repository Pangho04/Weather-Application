// features/detect-location/api/fetchAddress.ts

import { openWeatherClient } from '@/shared/api/openWeatherClient';
import { openMeteoClient } from '@/shared/api/openMeteoClient';
import type {
  CurrentWeatherResponseDto,
  ExtremeWeatherResponseDto,
  ForecastWeatherResponseDto,
} from './types';

const OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export const getNowWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeatherResponseDto> => {
  const { data } = await openWeatherClient.get('/data/2.5/weather', {
    params: { lon, lat, appid: OPEN_WEATHER_KEY, units: 'metric', lang: 'kr' },
  });

  return data;
};

export const getForecastWeather = async (
  lat: number,
  lon: number,
): Promise<ForecastWeatherResponseDto> => {
  const { data } = await openWeatherClient.get('/data/2.5/forecast', {
    params: { lon, lat, appid: OPEN_WEATHER_KEY, units: 'metric', lang: 'kr' },
  });

  return data;
};

export const getDailyExtremes = async (
  lat: number,
  lon: number,
): Promise<ExtremeWeatherResponseDto> => {
  const { data } = await openMeteoClient.get('forecast', {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'temperature_2m_max,temperature_2m_min',
      timezon: 'Asia%2FSeoul',
    },
  });

  return data;
};
