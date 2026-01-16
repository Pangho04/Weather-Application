// features/weather/model/useDailyExtremesQuery.ts
import { weatherKeys } from '@/shared/api/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getDailyExtremes } from '../api/getWeather';

type Props = {
  coords?: GeolocationCoordinates;
};

const useDailyExtremesQuery = ({ coords }: Props) =>
  useQuery({
    queryKey: [...weatherKeys.dailyExtremes, coords?.latitude, coords?.longitude],
    queryFn: async () => {
      if (!coords) throw new Error('좌표 정보가 없습니다.');

      return getDailyExtremes(coords.latitude, coords.longitude);
    },
    enabled: !!coords,
    select: (data) => ({
      todaysMaxTemp: data.daily.temperature_2m_max[0],
      todaysMinTemp: data.daily.temperature_2m_min[0],
    }),
    staleTime: 1000 * 60 * 60, // 일일 최고/최저 기온은 자주 바뀌지 않으므로 1시간 캐싱
  });

export default useDailyExtremesQuery;
