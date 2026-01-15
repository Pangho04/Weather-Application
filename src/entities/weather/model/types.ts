// 날씨 엔티티 타입 정의
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherData {
  weather: Weather[];
  main: Main;
  name: string;
  dt: number;
}
