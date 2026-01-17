import Box from '@/shared/ui/Box/Box';

import CurrentWeatherInfo from '@/features/weather/ui/CurrentWeatherInfo';
import DailyTempRange from '@/features/weather/ui/DailyTempRange';
import ForecastList from '@/features/weather/ui/ForecastList';
import LocationHeader from '@/features/location/ui/LocationHeader';
import { useCurrentCoords } from '@/features/location/model';

export function WeatherDetail() {
  const { coords } = useCurrentCoords();

  if (!coords) {
    return (
      <div className="w-full h-dvh flex flex-col landscape:flex-row landscape:justify-center landscape:gap-[24px] overflow-hidden">
        <Box styleProps="h-full landscape:justify-start">
          <span className="loading loading-spinner size-32" />
        </Box>
      </div>
    );
  }

  return (
    <div className="w-full h-dvh flex flex-col landscape:flex-row landscape:justify-center landscape:gap-[24px] overflow-hidden">
      <Box styleProps="flex-col landscape:justify-start">
        <LocationHeader />

        <Box styleProps="pb-0 w-full justify-around landscape:justify-center lg:justify-center">
          <CurrentWeatherInfo coords={coords} />
          <DailyTempRange coords={coords} />
        </Box>
      </Box>

      <ForecastList coords={coords} />
    </div>
  );
}
