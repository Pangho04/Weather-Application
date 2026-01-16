import { ICON_URL } from '@/shared/assets/openWeather.constants';
import Box from '@/shared/ui/Box/Box';
import { Fragment } from 'react/jsx-runtime';
import { useForecastWeatherQuery } from '../model';
import { formatWeatherTime } from '../lib/dateFormatter';

type Props = {
  coords: GeolocationCoordinates;
};

function ForecastList({ coords }: Props) {
  const { data: forecastWeather } = useForecastWeatherQuery({ coords });

  if (!forecastWeather) return <div />;

  return (
    <Box styleProps="flex-col justify-start pt-[34px] overflow-hidden">
      <ul className="list bg-base-100 rounded-box shadow-md overflow-y-auto h-3/4 mb-[72x]">
        {forecastWeather.list.map((el, index) => (
          <Fragment key={el.dt}>
            <li className="list-row p-8 items-center">
              <Box styleProps="flex-col">
                <p className="text-xl">{formatWeatherTime(el.dt_txt).day}</p>
                <p className="text-2xl">{formatWeatherTime(el.dt_txt).time}</p>
              </Box>
              <Box styleProps="w-full relative">
                <img
                  className="size-40"
                  src={`${ICON_URL}${el.weather[0].icon}@2x.png`}
                  alt={`${el.weather[0].description} icon`}
                />
                <p className="absolute text-xl font-bold bottom-2">{el.weather[0].description}</p>
              </Box>
              <p className="text-4xl">{`${el.main.temp} ℃`}</p>
            </li>
            {forecastWeather.list.length - 1 !== index && <div className="divider pl-4 pr-4 m-0" />}
          </Fragment>
        ))}
      </ul>
    </Box>
  );
}

export default ForecastList;
