import { useQueries, useQueryClient } from '@tanstack/react-query';
import { getCoordsByAddress } from '@/features/location/api/getLocation';
import { getNowWeather, getDailyExtremes } from '@/features/weather/api/getWeather';
import { locationKeys, weatherKeys } from '@/shared/api/queryKeys';
import { ICON_URL } from '@/shared/lib/openWeather.constants';

import type { CurrentWeatherResponseDto } from '@/features/weather/api/types';
import type { GeoCodingResponseDto } from '@/features/location/api/types';
import type { Favorite } from './types';

type FavoriteWeather = {
  favorite: Favorite;
  currentTemp?: number;
  iconUrl?: string;
  iconDescription?: string;
  todaysMaxTemp?: number;
  todaysMinTemp?: number;
  isLoading: boolean;
  error: Error | null;
};

function useFavoritesWeatherQueries(favorites: Favorite[]): FavoriteWeather[] {
  const queryClient = useQueryClient();

  // 각 favorite마다 3개의 쿼리 생성 (좌표 변환, 현재 날씨, 일일 최대/최소 기온)
  const allQueries = favorites.flatMap((favorite) => [
    // 1. 주소를 좌표로 변환
    {
      queryKey: [...locationKeys.coords, favorite.address] as const,
      queryFn: () => getCoordsByAddress(favorite.address),
      select: (data: GeoCodingResponseDto) => {
        if (!data.documents || data.documents.length === 0) {
          throw new Error('좌표를 찾을 수 없습니다.');
        }
        return {
          latitude: Number(data.documents[0].y),
          longitude: Number(data.documents[0].x),
        };
      },
      enabled: !!favorite.address,
      staleTime: 1000 * 60 * 60 * 24, // 24시간 (주소-좌표 변환은 자주 바뀌지 않음)
    },
    // 2. 현재 날씨 조회
    {
      queryKey: [...weatherKeys.current, favorite.address] as const,
      queryFn: async () => {
        const coordsData = await queryClient.ensureQueryData({
          queryKey: [...locationKeys.coords, favorite.address],
          queryFn: () => getCoordsByAddress(favorite.address),
        });

        return getNowWeather(Number(coordsData.documents[0].y), Number(coordsData.documents[0].x));
      },
      enabled: !!favorite.address,
      staleTime: 1000 * 60 * 10, // 10분
    },
    // 3. 일일 최대/최소 기온 조회
    {
      queryKey: [...weatherKeys.dailyExtremes, favorite.address] as const,
      queryFn: async () => {
        const coordsData = await queryClient.ensureQueryData({
          queryKey: [...locationKeys.coords, favorite.address],
          queryFn: () => getCoordsByAddress(favorite.address),
        });

        return getDailyExtremes(
          Number(coordsData.documents[0].y),
          Number(coordsData.documents[0].x),
        );
      },
      enabled: !!favorite.address,
      staleTime: 1000 * 60 * 60, // 1시간
      select: (data: Awaited<ReturnType<typeof getDailyExtremes>>) => ({
        todaysMaxTemp: data.daily.temperature_2m_max[0],
        todaysMinTemp: data.daily.temperature_2m_min[0],
      }),
    },
  ]);

  const queries = useQueries({
    queries: allQueries,
  });

  // 각 favorite별로 쿼리 결과를 그룹화
  return favorites.map((favorite, index) => {
    const baseIndex = index * 3;
    const coordsQuery = queries[baseIndex];
    const currentWeatherQuery = queries[baseIndex + 1];
    const dailyExtremesQuery = queries[baseIndex + 2];

    const isLoading =
      coordsQuery.isLoading || currentWeatherQuery.isLoading || dailyExtremesQuery.isLoading;

    const error = coordsQuery.error || currentWeatherQuery.error || dailyExtremesQuery.error;

    const currentWeatherData = currentWeatherQuery.data as CurrentWeatherResponseDto | undefined;
    const dailyExtremesData = dailyExtremesQuery.data as
      | { todaysMaxTemp: number; todaysMinTemp: number }
      | undefined;

    return {
      favorite,
      currentTemp: currentWeatherData?.main?.temp,
      iconUrl: `${ICON_URL}${currentWeatherData?.weather[0].icon}@4x.png`,
      iconDescription: currentWeatherData?.weather[0].description,
      todaysMaxTemp: dailyExtremesData?.todaysMaxTemp,
      todaysMinTemp: dailyExtremesData?.todaysMinTemp,
      isLoading,
      error: error as Error | null,
    };
  });
}

export default useFavoritesWeatherQueries;
