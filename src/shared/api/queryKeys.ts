export const weatherKeys = {
  all: ['weather'] as const,
  current: ['currentWeather'] as const,
  forecast: ['forecastWeather'] as const,
  dailyExtremes: ['daily-extremes'] as const,
};

export const locationKeys = {
  all: ['location'] as const,
  current: ['currentLocation'] as const,
  coords: ['getCoords'] as const,
};
