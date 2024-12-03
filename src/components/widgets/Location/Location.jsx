import Dropdown from '@/components/shared/Dropdown';
import { LOCATIONS } from '@/constants/locations';
import './Location.scss';

const Location = (props) => {
  return <Dropdown options={LOCATIONS} selectedOption={LOCATIONS?.[0]} {...props} />;
};

export default Location;
