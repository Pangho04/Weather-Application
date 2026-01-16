import Box from '@/shared/ui/Box/Box';
import { useDailyExtremesQuery } from '../model';

type Props = {
  coords: GeolocationCoordinates;
};

function DailyTempRange({ coords }: Props) {
  const { data: dailyExtremes } = useDailyExtremesQuery({ coords });

  return (
    <Box styleProps="flex-col items-start">
      <p className="text-2xl font-bold">⬆︎ {`${dailyExtremes?.todaysMaxTemp ?? 0} ℃`}</p>
      <div className="divider m-0" />
      <p className="text-2xl font-bold">⬇︎ {`${dailyExtremes?.todaysMinTemp ?? 0} ℃`}</p>
    </Box>
  );
}

export default DailyTempRange;
