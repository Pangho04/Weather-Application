import { useNavigate } from 'react-router-dom';
import Box from '@/shared/ui/Box/Box';
import StartIcon from '@/shared/ui/StartIcon/StartIcon';
import EditIcon from '@/shared/ui/EditIcon/EditIcon';
import useFavoritesWeatherQueries from '../model/useFavoritesWeatherQueries';

import type { Favorite } from '../model/types';

type Props = {
  favorites: Favorite[];
  scrollRef: React.RefObject<HTMLUListElement>;
  handleClickFavorite: (address: string) => void;
  handleEditFavorite: (address: string) => void;
};

function FavoritesCard({ favorites, handleClickFavorite, handleEditFavorite, scrollRef }: Props) {
  const navigate = useNavigate();

  const favoritesWeather = useFavoritesWeatherQueries(favorites);

  const handleSelectAddress = (address: string) => {
    navigate(`/?search=${encodeURIComponent(address)}`);
  };

  return (
    <ul
      ref={scrollRef}
      className="list space-y-2 overflow-y-auto max-h-[24rem] landscape:max-h-[10rem] lg:!max-h-[55rem] w-full"
    >
      {favoritesWeather.map((weatherData) => (
        <li key={weatherData.favorite.address} className="w-full p-0 block">
          <div className="card bg-base-100 shadow-sm border border-base-200 active:scale-95 transition-transform cursor-pointer w-full">
            <div className="card-body p-4">
              <div className="flex flex-row items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSelectAddress(weatherData.favorite.address)}
                  className="flex-1 text-left"
                  aria-label={`${weatherData.favorite.name} 날씨 정보 보기`}
                >
                  <Box styleProps="flex-row items-center justify-between">
                    <Box styleProps="flex-row justify-center items-center">
                      <p
                        className={`text-xl lg:text-3xl font-bold break-words ${
                          weatherData.favorite.name.length <= 3 ? 'whitespace-nowrap' : ''
                        }`}
                      >
                        {weatherData.favorite.name}
                      </p>
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                      <div
                        role="button"
                        tabIndex={0}
                        className="ml-2 cursor-pointer"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.stopPropagation();
                          handleEditFavorite(weatherData.favorite.address);
                        }}
                        aria-label={`${weatherData.favorite.name} 편집`}
                      >
                        <EditIcon size={15} />
                      </div>
                    </Box>
                    <Box styleProps="flex-col justify-center items-center relative">
                      {weatherData.isLoading && (
                        <>
                          <div className="skeleton size-14 lg:size-40 rounded-lg" />
                          <div className="skeleton h-4 lg:h-6 w-20 lg:w-32 mt-2" />
                        </>
                      )}
                      {!weatherData.isLoading && !weatherData.error && (
                        <>
                          {weatherData.iconUrl && (
                            <img
                              className="size-24 lg:size-40 object-contain"
                              src={weatherData.iconUrl}
                              alt={`${weatherData.favorite.name} 날씨 아이콘`}
                            />
                          )}
                          {weatherData.iconDescription && (
                            <p className="text-md lg:text-xl font-bold mt-2 text-center absolute bottom-0">
                              {weatherData.iconDescription}
                            </p>
                          )}
                        </>
                      )}
                    </Box>
                    <Box styleProps="flex-col justify-center items-center pr-[16px] lg:pr-[24px]">
                      {weatherData.isLoading && (
                        <>
                          <div className="skeleton h-12 lg:h-20 w-20 lg:w-40" />
                          <div className="skeleton h-3 lg:h-4 w-24 lg:w-40 mt-2" />
                        </>
                      )}
                      {!weatherData.isLoading && !weatherData.error && (
                        <>
                          <p className="text-3xl lg:text-6xl font-bold">
                            {`${Math.round(weatherData.currentTemp ?? 0)}°C`}
                          </p>
                          <div className="flex gap-2 mt-1 text-xs lg:text-sm text-gray-600">
                            {weatherData.todaysMaxTemp && weatherData.todaysMinTemp && (
                              <span className="lg:text-xl">
                                ⬆︎ {Math.round(weatherData.todaysMaxTemp)}°C /&nbsp; ⬇︎{' '}
                                {Math.round(weatherData.todaysMinTemp)}°C
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </Box>
                  </Box>
                </button>
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleClickFavorite(weatherData.favorite.address);
                  }}
                  className="ml-2 mr-4"
                  aria-label={`${weatherData.favorite.name} 즐겨찾기에서 제거`}
                >
                  <StartIcon active />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesCard;
