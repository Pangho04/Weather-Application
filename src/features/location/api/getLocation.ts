// features/detect-location/api/fetchAddress.ts
import { kakaoClient } from '@/shared/api/kakaoClient';

import type { GeoCodingResponseDto, ReverseGeoCodingResponseDto } from './types';

export const getAddressByCoords = async (
  lat: number,
  lon: number,
): Promise<ReverseGeoCodingResponseDto> => {
  const { data } = await kakaoClient.get('/geo/coord2address.json', {
    params: { x: lon, y: lat },
  });

  return data;
};

export const getCoordsByAddress = async (location: string): Promise<GeoCodingResponseDto> => {
  const { data } = await kakaoClient.get('search/address.json', {
    params: { query: location },
  });

  return data;
};
