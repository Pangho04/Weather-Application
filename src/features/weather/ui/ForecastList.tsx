import { ICON_URL } from '@/shared/lib/openWeather.constants';
import Box from '@/shared/ui/Box/Box';
import { Fragment } from 'react/jsx-runtime';
import { useScrollBottomFade } from '@/shared/hooks';
import { useForecastWeatherQuery } from '../model';
import { formatWeatherTime } from '../lib/dateFormatter';

type Props = {
  coords: GeolocationCoordinates;
};

function ForecastList({ coords }: Props) {
  const { data: forecastWeather, isLoading, isSuccess } = useForecastWeatherQuery({ coords });

  const { scrollRef, showBottomFade } = useScrollBottomFade<HTMLUListElement>({
    deps: [forecastWeather?.list.length],
  });

  if (isLoading) {
    return (
      <Box styleProps="h-full items-start">
        <div className="skeleton shadow-md h-3/5 w-full lg:w-3/5 mt-10" />
      </Box>
    );
  }

  if (!isSuccess) {
    return <div />;
  }

  return (
    <Box styleProps="flex-col w-full overflow-hidden landscape:w-auto">
      <Box styleProps="flex-col justify-start pt-[16px] lg:pt-[34px] max-w-[508px] overflow-hidden pr-[12px] pl-[12px]">
        <p className="pb-[8px] font-bold w-full text-gray-500">🕖 시간대 별 기온</p>
        <div className="relative h-3/4">
          <ul
            ref={scrollRef}
            className="list bg-base-100 rounded-box shadow-md overflow-y-auto h-full mb-[72x]"
          >
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
          {showBottomFade && (
            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-base-100 via-base-100/80 to-transparent" />
          )}
        </div>
      </Box>
    </Box>
  );
}

export default ForecastList;
