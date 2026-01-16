import { ICON_URL } from '@/shared/assets/openWeather.constants';
import Box from '@/shared/ui/Box/Box';
import { useCurrentWeatherQuery } from '../model';

type Props = {
  coords: GeolocationCoordinates;
};

function CurrentWeatherInfo({ coords }: Props) {
  const { data: currentWeather } = useCurrentWeatherQuery({ coords });

  if (!currentWeather) return <div />;

  return (
    <>
      <Box styleProps="flex-col relative">
        <img
          className="size-60"
          src={`${ICON_URL}${currentWeather.weather[0].icon}@4x.png`}
          alt={`${currentWeather.weather[0].description} icon`}
        />
        <p className="absolute text-2xl font-bold bottom-4">
          {currentWeather.weather[0].description}
        </p>
      </Box>
      <p className="text-6xl font-bold pr-[24px]">{`${currentWeather.main.temp} ℃`}</p>
    </>
  );
}

export default CurrentWeatherInfo;
