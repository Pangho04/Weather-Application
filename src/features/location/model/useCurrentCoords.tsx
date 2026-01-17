import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useOverlayAlert from '@/shared/hooks/useOverlayAlert';
import useLocationToCoordsQuery from './useLocationToCoordsQuery';

function useCurrentCoords() {
  const [coords, setCoords] = useState<GeolocationCoordinates | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const { showAlert, closeAlert } = useOverlayAlert();

  const location = searchParams.get('search');

  const { data, isSuccess } = useLocationToCoordsQuery({
    location: location || undefined,
  });

  /**
   * @when 화면 진입 시
   * @expect 현재 위치의 위도, 경도를 반환합니다.
   * @clear -
   */
  useEffect(() => {
    if ('geolocation' in navigator && !location) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCoords(position.coords);
        },
        (error) => {
          if (error.code === 1) {
            const overlayId = showAlert({
              title: '알림',
              children: (
                <p className="text-center text-lg pt-4 text-error flex justify-center items-center">
                  위치 정보 권한이 없어 날씨 정보를 조회할 수 없습니다.
                </p>
              ),
              buttons: [
                {
                  text: '확인',
                  onClick: () => {
                    closeAlert(overlayId);
                  },
                },
              ],
            });
          }
        },
      );

      return;
    }

    if (location && data?.documents?.[0] && isSuccess) {
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
  }, [location, data, isSuccess, showAlert, closeAlert]);

  return { coords };
}

export default useCurrentCoords;
