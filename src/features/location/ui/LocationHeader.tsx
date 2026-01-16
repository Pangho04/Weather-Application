import { useLocationQuery } from '../model';

function LocationHeader() {
  const { data: locationInfo, isLoading } = useLocationQuery();

  if (isLoading) {
    return <div className="skeleton h-12 w-1/3 lg:w-1/4" />;
  }

  return (
    <p className="text-3xl lg:text-6xl font-bold pt-[32px] lg:pt-[48px]">
      {locationInfo?.leafAddress}
    </p>
  );
}

export default LocationHeader;
