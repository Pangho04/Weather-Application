/* eslint-disable @typescript-eslint/naming-convention */
import type {
  GeoCodingResponseDto,
  ReverseGeoCodingResponseDto,
} from '@/features/location/api/types';

export function getLeafAddress(data: ReverseGeoCodingResponseDto | GeoCodingResponseDto) {
  const { region_1depth_name, region_2depth_name, region_3depth_name } = data.documents[0].address;

  if (region_3depth_name) return region_3depth_name;
  if (region_2depth_name) return region_2depth_name;

  return region_1depth_name;
}
