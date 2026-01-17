import { ICON_URL } from '@/shared/lib/openWeather.constants';
import Box from '@/shared/ui/Box/Box';
import { Fragment } from 'react/jsx-runtime';
import { useForecastWeatherQuery } from '../model';
import { formatWeatherTime } from '../lib/dateFormatter';

type Props = {
  coords: GeolocationCoordinates;
};

function ForecastList({ coords }: Props) {
  const { data: forecastWeather, isLoading } = useForecastWeatherQuery({ coords });

  if (isLoading) {
    return (
      <Box styleProps="h-full items-start">
        <div className="skeleton shadow-md h-3/5 w-full lg:w-3/5 mt-10" />
      </Box>
    );
  }

  if (!forecastWeather) return <div />;

  return (
    <Box styleProps="flex-col w-full overflow-hidden landscape:w-auto">
      <Box styleProps="flex-col justify-start pt-[16px] lg:pt-[34px] max-w-[508px] overflow-hidden pr-[12px] pl-[12px]">
        <p className="pb-[8px] font-bold w-full text-gray-500">🕖 시간대 별 기온</p>
        <ul className="list bg-base-100 rounded-box shadow-md overflow-y-auto h-3/4 mb-[72x]">
          {forecastWeather.list.map((el, index) => (
            <Fragment key={el.dt}>
              <li className="list-row p-8 items-center">
                <Box styleProps="flex-col">
                  <p className="text-base lg:text-xl">{formatWeatherTime(el.dt_txt).day}</p>
                  <p className="text-xl font-bold lg:text-2xl">
                    {formatWeatherTime(el.dt_txt).time}
                  </p>
                </Box>
                <Box styleProps="flex-col w-full relative">
                  <img
                    className="size-24 lg:size-40 object-contain"
                    src={`${ICON_URL}${el.weather[0].icon}@2x.png`}
                    alt={`${el.weather[0].description} icon`}
                  />
                  <p className="text-base lg:text-xl font-bold bottom-0 lg:bottom-2">
                    {el.weather[0].description}
                  </p>
                </Box>
                <p className="font-bold text-3xl lg:text-4xl">{`${el.main.temp} ℃`}</p>
              </li>
              {forecastWeather.list.length - 1 !== index && (
                <div className="divider pl-4 pr-4 m-0" />
              )}
            </Fragment>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

export default ForecastList;
