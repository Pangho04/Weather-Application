import { useQuery } from '@tanstack/react-query';
import { locationKeys } from '@/shared/api/queryKeys';
import { getLeafAddress } from '@/features/location/lib/getLeafAddress';
import { getAddressByCoords } from '../api/getLocation';

function useCoordsToLocationQuery({ coords }: { coords?: GeolocationCoordinates }) {
  return useQuery({
    queryKey: [...locationKeys.current, coords?.latitude, coords?.longitude],
    queryFn: () => {
      if (!coords) throw new Error('좌표 정보가 없습니다.');

      return getAddressByCoords(coords.latitude, coords.longitude);
    },
    enabled: !!coords?.latitude && !!coords?.longitude,
    select: (data) => ({
      ...data,
      leafAddress: getLeafAddress(data),
    }),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

export default useCoordsToLocationQuery;
