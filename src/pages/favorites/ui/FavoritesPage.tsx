import useFavoriteList from '@/features/favorites/model/useFavoriteList';
import { useScrollBottomFade } from '@/shared/hooks';
import FavoritesCard from '@/features/favorites/ui/FavoritesCard';

function FavoritesPage() {
  const { favorites, handleClickFavorite, handleEditFavorite } = useFavoriteList();
  const { scrollRef, showBottomFade } = useScrollBottomFade<HTMLUListElement>({
    deps: [favorites],
  });

  return (
    <div className="w-full h-full px-[8px] lg:w-3/5 lg:self-center overflow-hidden">
      <div className="mt-6 landscape:mt-0 card w-full h-5/6 flex flex-col bg-base-300 p-4 shadow-lg">
        <h2 className="text-lg lg:text-3xl font-bold px-1">즐겨찾기 목록</h2>
        <div className="divider mt-0 mb-2 lg:mt-2 lg:mb-4" />
        {favorites.length === 0 ? (
          <div className="text-center py-10 text-gray-500">등록된 즐겨찾기가 없습니다.</div>
        ) : (
          <div className="relative">
            <FavoritesCard
              favorites={favorites}
              scrollRef={scrollRef}
              handleClickFavorite={handleClickFavorite}
              handleEditFavorite={handleEditFavorite}
            />
            {showBottomFade && (
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-base-300 via-base-300/80 to-transparent" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
