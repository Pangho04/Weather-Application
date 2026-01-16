import { useQuery } from '@tanstack/react-query';
import { weatherKeys } from '@/shared/api/queryKeys';
import { getForecastWeather } from '../api/getWeather';
import { getMinMaxTemp } from '../lib/getMinMaxTemp';

type Props = {
  coords?: GeolocationCoordinates;
};

function useForecastWeatherQuery({ coords }: Props) {
  return useQuery({
    queryKey: [...weatherKeys.forecast, coords?.latitude, coords?.longitude],
    queryFn: () => {
      if (!coords) throw new Error('좌표 정보가 없습니다.');

      return getForecastWeather(coords.latitude, coords.longitude);
    },
    enabled: !!coords?.latitude && !!coords?.longitude,
    staleTime: 1000 * 60 * 10, // 10분,
    select: (data) => ({
      ...data,
      minMaxTemp: getMinMaxTemp(data.list),
    }),
  });
}

export default useForecastWeatherQuery;
