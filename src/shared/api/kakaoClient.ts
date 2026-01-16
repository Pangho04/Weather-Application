import axios from 'axios';

const KAKAO_KEY = `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`;

export const kakaoClient = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: {
    Authorization: KAKAO_KEY,
  },
});
