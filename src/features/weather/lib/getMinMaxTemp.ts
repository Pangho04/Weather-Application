import { convertToKst } from './convertToKst';

import type { ForecastWeatherType } from '../api/types';
import type { MinMaxTemp } from './types';

export const getMinMaxTemp = (forecastList: ForecastWeatherType[]): MinMaxTemp => {
  const now = new Date();
  const kstToday = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }).formatToParts(now);

  const y = kstToday.find((p) => p.type === 'year')?.value;
  const m = kstToday.find((p) => p.type === 'month')?.value;
  const d = kstToday.find((p) => p.type === 'day')?.value;
  const todayString = `${y}-${m}-${d}`;

  // 오늘 날짜에 해당하는 데이터만 필터링 후 온도 추출
  const todayTemps = forecastList
    .filter((item) => convertToKst(item.dt_txt) === todayString)
    .map((item) => item.main.temp);

  if (todayTemps.length === 0) return null;

  return {
    maxTemp: Math.max(...todayTemps),
    minTemp: Math.min(...todayTemps),
  };
};
