import { useNavigate } from 'react-router-dom';
import Box from '@/shared/ui/Box/Box';
import StartIcon from '@/shared/ui/StartIcon/StartIcon';
import useFavoritesWeatherQueries from '../model/useFavoritesWeatherQueries';

import type { Favorite } from '../model/types';

type Props = {
  favorites: Favorite[];
  scrollRef: React.RefObject<HTMLUListElement>;
  onClickFavorite: (address: string) => void;
};

function FavoritesCard({ favorites, onClickFavorite, scrollRef }: Props) {
  const navigate = useNavigate();

  const favoritesWeather = useFavoritesWeatherQueries(favorites);

  const handleSelectAddress = (address: string) => {
    navigate(`/?search=${encodeURIComponent(address)}`);
  };

  return (
    <ul
      ref={scrollRef}
      className="list space-y-2 overflow-y-auto max-h-[24rem] landscape:max-h-[10rem]  lg:!max-h-[55rem] w-full"
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
                >
                  <Box styleProps="flex-row items-center justify-between">
                    <Box styleProps="flex-col justify-center items-start">
                      <p className="text-xl lg:text-3xl font-bold ml-2">
                        {weatherData.favorite.name}
                      </p>
                    </Box>
                    <Box styleProps="flex-col justify-center items-center relative">
                      {weatherData.isLoading ? (
                        <>
                          <div className="skeleton size-14 lg:size-40 rounded-lg" />
                          <div className="skeleton h-4 lg:h-6 w-20 lg:w-32 mt-2" />
                        </>
                      ) : (
                        <>
                          <img
                            className="size-24 lg:size-40 object-contain"
                            src={weatherData.iconUrl ?? ''}
                            alt={`${weatherData.favorite.name} icon`}
                          />
                          {weatherData.iconDescription && (
                            <p className="text-md lg:text-xl font-bold mt-2 text-center absolute bottom-0">
                              {weatherData.iconDescription}
                            </p>
                          )}
                        </>
                      )}
                    </Box>
                    <Box styleProps="flex-col justify-center items-center pr-[16px] lg:pr-[24px]">
                      {weatherData.isLoading ? (
                        <>
                          <div className="skeleton h-12 lg:h-20 w-20 lg:w-40" />
                          <div className="skeleton h-3 lg:h-4 w-24 lg:w-40 mt-2" />
                        </>
                      ) : (
                        <>
                          <p className="text-3xl lg:text-6xl font-bold">
                            {`${Math.round(weatherData.currentTemp ?? 0)}°C`}
                          </p>
                          <div className="flex gap-2 mt-1 text-xs lg:text-sm text-gray-600">
                            {weatherData.todaysMaxTemp !== undefined &&
                              weatherData.todaysMinTemp !== undefined && (
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickFavorite(weatherData.favorite.address);
                  }}
                  className="ml-2 mr-4"
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
