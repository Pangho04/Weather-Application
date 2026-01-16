import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocationToCoordsQuery from './useLocationToCoordsQuery';

function useCurrentCoords() {
  const [coords, setCoords] = useState<GeolocationCoordinates | undefined>(undefined);
  const [searchParams] = useSearchParams();

  const location = searchParams.get('search');

  const { data } = useLocationToCoordsQuery({ location: location || undefined });

  /**
   * @when 화면 진입 시
   * @expect 현재 위치의 위도, 경도를 반환합니다.
   * @clear -
   */
  useEffect(() => {
    if ('geolocation' in navigator && !location) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCoords(position.coords);
      });
    }

    if (location && data) {
      const searchCoord = {
        latitude: Number(data.documents[0].y),
        longitude: Number(data.documents[0].x),
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: () => null,
      };

      setCoords(searchCoord);
    }
  }, [location, data]);

  return { coords };
}

export default useCurrentCoords;
