import '@/components/widgets/Location/Location.scss';

import { useMemo } from 'react';

import Dropdown from '@/components/shared/Dropdown';
import Skeleton from '@/components/shared/Skeleton';
import { LOCATIONS } from '@/constants/locations';
import { useGetLocationsQuery } from '@/store/locations/locationsApi';

const Location = ({ selectedOnMount, ...props }) => {
  const { data: locations, error, isLoading } = useGetLocationsQuery();
  const stableLocations = useMemo(() => locations?.data || [], [locations]);

  const selected = useMemo(
    () => stableLocations.find((item) => Number(item?.id) === Number(selectedOnMount)),
    [stableLocations, selectedOnMount]
  );

  if (isLoading)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Skeleton radius="10px" height="54px" />
      </div>
    );
  if (error) return null;

  return (
    <Dropdown options={stableLocations} optionKey="state" selectedOption={selected || LOCATIONS?.[0]} {...props} />
  );
};

export default Location;
