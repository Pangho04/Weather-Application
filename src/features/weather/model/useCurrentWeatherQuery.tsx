import { useQuery } from '@tanstack/react-query';
import { weatherKeys } from '@/shared/api/queryKeys';
import { getNowWeather } from '../api/getWeather';

type Props = {
  coords?: GeolocationCoordinates;
};

function useCurrentWeatherQuery({ coords }: Props) {
  return useQuery({
    queryKey: [...weatherKeys.current, coords?.latitude, coords?.longitude],
    queryFn: () => {
      if (!coords) throw new Error('좌표 정보가 없습니다.');

      return getNowWeather(coords.latitude, coords.longitude);
    },
    enabled: !!coords?.latitude && !!coords?.longitude,
    staleTime: 1000 * 60 * 10, // 10분
  });
}

export default useCurrentWeatherQuery;
