// features/location-detect/model/useResolvedLocation.ts
import { useSearchParams } from 'react-router-dom';

import useCoordsToLocationQuery from './useCoordsToLocationQuery';
import useLocationToCoordsQuery from './useLocationToCoordsQuery';
import useCurrentCoords from './useCurrentCoords';

function useLocationQuery() {
  const [searchParams] = useSearchParams();

  const searchKeyword = searchParams.get('search') || '';

  const { coords } = useCurrentCoords();

  const searchedLocation = useLocationToCoordsQuery({
    location: searchKeyword,
  });

  const currentLocation = useCoordsToLocationQuery({
    coords,
  });

  const isSearchMode = !!searchKeyword;
  const activeQuery = isSearchMode ? searchedLocation : currentLocation;

  return activeQuery;
}

export default useLocationQuery;
