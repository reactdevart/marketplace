import Dropdown from '@/components/shared/Dropdown';
import './DropdownSubCategory.scss';
import { useSelector } from 'react-redux';
import { getSubcategoriesoptions } from '@/store/categories/categoriesSlice';

const DropdownSubCategory = (props) => {
  const options = useSelector(getSubcategoriesoptions);
  return <Dropdown options={options} selectedOption={options?.[0]} {...props} className="dropdown-sub-category" />;
};

export default DropdownSubCategory;
