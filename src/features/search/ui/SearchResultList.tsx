import { useNavigate } from 'react-router-dom';
import { useScrollBottomFade } from '@/shared/hooks';
import StartIcon from '@/shared/ui/StartIcon/StartIcon';
import useFavoriteList from '@/features/favorites/model/useFavoriteList';

type Props = {
  fullResults: string[];
};

function SearchResultList({ fullResults }: Props) {
  const navigate = useNavigate();

  const { scrollRef, showBottomFade } = useScrollBottomFade<HTMLUListElement>({
    deps: [fullResults],
  });
  const { favorites, handleClickFavorite } = useFavoriteList();

  const handleSelectAddress = (address: string) => {
    navigate(`/?search=${encodeURIComponent(address)}`);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold px-1">
        검색 결과 <span className="text-primary">{fullResults.length}</span>
      </h2>
      <div className="divider mt-0 mb-2" />

      {fullResults.length === 0 ? (
        <div className="text-center py-10 text-gray-500">검색 결과가 없습니다.</div>
      ) : (
        <div className="relative">
          <ul
            ref={scrollRef}
            className="list space-y-2 overflow-y-auto max-h-[21rem] landscape:max-h-[6rem] lg:!max-h-[50rem] w-full"
          >
            {fullResults.map((address) => (
              <li key={address} className="w-full p-0 block">
                <div className="card bg-base-100 shadow-sm border border-base-200 active:scale-95 transition-transform cursor-pointer w-full">
                  <div className="card-body p-4 flex flex-row items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleSelectAddress(address)}
                      className="flex-1 text-left"
                    >
                      <p className="font-medium">{address.replaceAll('-', ' ')}</p>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickFavorite(address);
                      }}
                      className="ml-2"
                    >
                      <StartIcon
                        active={favorites.some((favorite) => favorite.address === address)}
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {showBottomFade && (
            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-base-300 via-base-300/80 to-transparent" />
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResultList;
