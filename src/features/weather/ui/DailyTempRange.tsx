import Box from '@/shared/ui/Box/Box';
import { useDailyExtremesQuery } from '../model';

type Props = {
  coords: GeolocationCoordinates;
};

function DailyTempRange({ coords }: Props) {
  const { data: dailyExtremes, isLoading } = useDailyExtremesQuery({ coords });

  if (isLoading) {
    return (
      <Box styleProps="flex-col items-start w-1/5 lg:w-1/6 items-center">
        <div className="skeleton h-2 lg:h-4 w-3/4" />
        <div className="divider m-0" />
        <div className="skeleton h-2 lg:h-4 w-3/4" />
      </Box>
    );
  }

  return (
    <Box styleProps="flex-col items-start">
      <p className="text-lg lg:text-2xl font-bold">⬆︎ {`${dailyExtremes?.todaysMaxTemp ?? 0} ℃`}</p>
      <div className="divider m-0" />
      <p className="text-lg lg:text-2xl font-bold">⬇︎ {`${dailyExtremes?.todaysMinTemp ?? 0} ℃`}</p>
    </Box>
  );
}

export default DailyTempRange;
