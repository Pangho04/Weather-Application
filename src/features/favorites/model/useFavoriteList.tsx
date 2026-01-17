import { FAVORITES_LOCAL_STORAGE_KEY, MAX_FAVORITE_LIMIT } from '@/shared/lib/favorites.constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import useOverlayAlert from '@/shared/hooks/useOverlayAlert';
import openEditFavoriteNameAlert from '../lib/openEditFavoriteNameAlert';

import type { Favorite } from './types';

function useFavoriteList() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const editedNameRef = useRef<string>('');
  const { showAlert, closeAlert } = useOverlayAlert();

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

  const handleClickFavorite = useCallback(
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

  const handleEditFavorite = useCallback(
    (address: string) => {
      const currentFavorite = favorites.find((favorite) => favorite.address === address);
      const initialName = currentFavorite?.name || '';

      editedNameRef.current = initialName;

      openEditFavoriteNameAlert({
        defaultValue: initialName,
        inputRef: editedNameRef,
        onClose: () => {
          editedNameRef.current = '';
        },
        onSave: () => {
          const nameToSave = editedNameRef.current.trim();

          if (nameToSave.length < 1 || nameToSave.length > 10) return;

          setFavorites((prevFavorites) => {
            const newFavorites = prevFavorites.map((favorite) => {
              if (favorite.address === address) {
                return { ...favorite, name: nameToSave };
              }

              return favorite;
            });

            localStorage.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
            return newFavorites;
          });

          editedNameRef.current = '';
        },
        showAlert,
        closeAlert,
      });
    },
    [favorites, showAlert, closeAlert],
  );

  return { favorites, handleClickFavorite, handleEditFavorite };
}

export default useFavoriteList;
