import '@/components/widgets/DropdownSubCategory/DropdownSubCategory.scss';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from '@/components/shared/Dropdown';
import { getSubcategoriesOptions, setSelectedSubcategory } from '@/store/categories/categoriesSlice';

const DropdownSubCategory = ({ onSelect, ...restProps }) => {
  const options = useSelector(getSubcategoriesOptions);
  const dispatch = useDispatch();

  const handleSelect = useCallback(
    (option) => {
      const selectedOption = options?.find((item) => item?.id === option?.id);
      onSelect?.(option);
      dispatch(setSelectedSubcategory(selectedOption));
    },
    [options, onSelect, dispatch]
  );

  return (
    <Dropdown
      onSelect={handleSelect}
      options={options}
      selectedOption={options?.[0]}
      {...restProps}
      className="dropdown-sub-category"
    />
  );
};

export default DropdownSubCategory;
