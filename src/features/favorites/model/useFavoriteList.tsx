import { FAVORITES_LOCAL_STORAGE_KEY, MAX_FAVORITE_LIMIT } from '@/shared/lib/favorites.constants';
import { useCallback, useEffect, useState } from 'react';
import type { Favorite } from './types';

function useFavoriteList() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  /**
   * @when 화면 진입 시
   * @expect 즐겨찾기 목록을 로컬 스토리지에서 가져옵니다.
   * @clear -
   */
  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_LOCAL_STORAGE_KEY);

    if (storedFavorites && storedFavorites.length > 0) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const onClickFavorite = useCallback(
    (address: string) => {
      if (favorites.some((favorite) => favorite.address === address)) {
        const newFavorites = favorites.filter((favorite) => favorite.address !== address);

        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));

        return;
      }

      if (favorites.length >= MAX_FAVORITE_LIMIT) return;

      const newFavorites = [
        ...favorites,
        { name: address.split('-').reverse()[0], address, order: favorites.length + 1 },
      ];

      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    },
    [favorites],
  );

  return { favorites, onClickFavorite };
}

export default useFavoriteList;
