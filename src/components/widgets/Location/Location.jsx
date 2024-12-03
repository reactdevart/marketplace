import '@/components/widgets/Location/Location.scss';

import Dropdown from '@/components/shared/Dropdown';
import { LOCATIONS } from '@/constants/locations';

const Location = (props) => {
  return <Dropdown options={LOCATIONS} selectedOption={LOCATIONS?.[0]} {...props} />;
};

export default Location;
