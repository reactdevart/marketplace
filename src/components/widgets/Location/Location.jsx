import '@/components/widgets/Location/Location.scss';

import Dropdown from '@/components/shared/Dropdown';
import Skeleton from '@/components/shared/Skeleton';
import { LOCATIONS } from '@/constants/locations';
import { useGetLocationsQuery } from '@/store/locations/locationsApi';

const Location = (props) => {
  const { data: locations, error, isLoading } = useGetLocationsQuery();

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Skeleton radius="10px" height="54px" />
      </div>
    );
  if (error) return null;

  return <Dropdown options={locations?.data} optionKey="state" selectedOption={LOCATIONS?.[0]} {...props} />;
};

export default Location;
