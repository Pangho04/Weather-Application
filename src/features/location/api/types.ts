type ReverseGeocodingDocument = {
  road_address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
  };
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
    zip_code: string;
  };
};

type GeoCodingDocument = {
  address: {
    address_name: string;
    b_code: string;
    h_code: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_h_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  address_name: string;
  address_type: string;
  road_address: null;
  x: string;
  y: string;
};

export interface ReverseGeoCodingResponseDto {
  meta: {
    total_count: number;
  };
  documents: ReverseGeocodingDocument[];
  leafAddress: string;
}

export interface GeoCodingResponseDto {
  documents: GeoCodingDocument[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}
