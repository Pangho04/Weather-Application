import useCurrentWeatherQuery from '@/features/weather/model/useCurrentWeatheQuery';

import Box from '@/shared/ui/Box/Box';
import { useForecastWeatherQuery } from '@/features/weather/model';
import CurrentWeatherInfo from '@/features/weather/ui/CurrentWeatherInfo';
import DailyTempRange from '@/features/weather/ui/DailyTempRange';
import ForecastList from '@/features/weather/ui/ForecastList';
import TabWidget from '@/widgets/tabWidget/ui/TabWidget';
import LocationHeader from '@/features/location/ui/LocationHeader';
import { useCurrentCoords } from '@/features/location/model';

export function WeatherDetail() {
  const { coords } = useCurrentCoords();

  const { data: currentWeather } = useCurrentWeatherQuery({ coords });
  const { data: forecastWeather } = useForecastWeatherQuery({ coords });

  if (!currentWeather || !forecastWeather || !coords) {
    return <h1>날씨 정보가 없습니다.</h1>;
  }

  return (
    <div className="w-full h-dvh flex flex-col overflow-hidden">
      <Box styleProps="flex-col">
        <LocationHeader />

        <Box styleProps="pb-0">
          <CurrentWeatherInfo coords={coords} />
          <DailyTempRange coords={coords} />
        </Box>
      </Box>

      <ForecastList coords={coords} />

      <TabWidget />
    </div>
  );
}
