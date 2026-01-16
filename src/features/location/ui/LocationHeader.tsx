import { useLocationQuery } from '../model';

function LocationHeader() {
  const { data: locationInfo } = useLocationQuery();

  return <p className="text-6xl font-bold pt-[48px]">{locationInfo?.leafAddress}</p>;
}

export default LocationHeader;
