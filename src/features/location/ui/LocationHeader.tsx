import StartIcon from '@/shared/ui/StartIcon/StartIcon';
import Box from '@/shared/ui/Box/Box';
import { useFavoriteList } from '@/features/favorites/model';
import { useLocationQuery } from '../model';

function LocationHeader() {
  const { data: locationInfo, isLoading } = useLocationQuery();
  const { favorites, onClickFavorite } = useFavoriteList();

  if (isLoading) {
    return <div className="skeleton h-12 w-1/3 lg:w-1/4" />;
  }

  return (
    <Box styleProps="flex-row items-center justify-center gap-6 lg:gap-8 w-full">
      <p className="text-3xl lg:text-6xl font-bold pt-[12px] lg:pt-[48px]">
        {locationInfo?.leafAddress}
      </p>
      <button
        type="button"
        className="flex items-center pt-[12px] lg:pt-[48px]"
        onClick={() => onClickFavorite(locationInfo?.leafAddress ?? '')}
      >
        <StartIcon
          active={favorites.some(
            (favorite) => favorite.address.split('-').reverse()[0] === locationInfo?.leafAddress,
          )}
          size={24}
        />
      </button>
    </Box>
  );
}

export default LocationHeader;
