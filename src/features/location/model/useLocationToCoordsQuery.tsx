import { useQuery } from '@tanstack/react-query';
import { locationKeys } from '@/shared/api/queryKeys';
import { getLeafAddress } from '@/features/location/lib/getLeafAddress';
import { getCoordsByAddress } from '../api/getLocation';

function useLocationToCoordsQuery({ location }: { location?: string }) {
  return useQuery({
    queryKey: [...locationKeys.coords, location],
    queryFn: () => {
      if (!location) throw new Error('검색할 장소가 없습니다.');

      return getCoordsByAddress(location);
    },
    select: (data) => ({
      ...data,
      leafAddress: getLeafAddress(data),
    }),
    enabled: !!location,
  });
}

export default useLocationToCoordsQuery;
