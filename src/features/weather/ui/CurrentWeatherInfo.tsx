import { ICON_URL } from '@/shared/lib/openWeather.constants';
import Box from '@/shared/ui/Box/Box';
import { useCurrentWeatherQuery } from '../model';

type Props = {
  coords: GeolocationCoordinates;
};

function CurrentWeatherInfo({ coords }: Props) {
  const { data: currentWeather, isLoading } = useCurrentWeatherQuery({ coords });

  if (isLoading) {
    return (
      <>
        <Box styleProps="flex-col relative">
          <div className="skeleton size-32 m-2" />
          <div className="skeleton h-4 w-1/4 m-2" />
        </Box>
        <div className="skeleton h-12 w-1/3 lg:w-1/4 mr-4 ml-4" />
      </>
    );
  }

  if (!currentWeather) return <div />;

  return (
    <>
      <Box styleProps="flex-col relative">
        <img
          className="size-32 lg:size-60 object-contain"
          src={`${ICON_URL}${currentWeather.weather[0].icon}@4x.png`}
          alt={`${currentWeather.weather[0].description} icon`}
        />
        <p className="absolute text-xl lg:text-2xl font-bold bottom-2 lg:bottom-4">
          {currentWeather.weather[0].description}
        </p>
      </Box>
      <p className="text-4xl lg:text-6xl landscape:text-3xl whitespace-nowrap font-bold pr-[16px] lg:pr-[24px]">{`${currentWeather.main.temp} ℃`}</p>
    </>
  );
}

export default CurrentWeatherInfo;
