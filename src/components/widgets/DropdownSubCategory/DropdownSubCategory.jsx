import '@/components/widgets/DropdownSubCategory/DropdownSubCategory.scss';

import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from '@/components/shared/Dropdown';
import {
  getSelectedSubcategory,
  getSubcategoriesData,
  getSubcategoriesOptions,
  setSelectedSubcategory,
} from '@/store/categories/categoriesSlice';

const DropdownSubCategory = ({ onSelect, selectedOnMount, ...restProps }) => {
  const options = useSelector(getSubcategoriesOptions);
  const subcategoriesData = useSelector(getSubcategoriesData);
  const selectedSubcategory = useSelector(getSelectedSubcategory);
  const dispatch = useDispatch();
  const selected = useMemo(
    () => options?.find((item) => Number(item?.id) === Number(selectedOnMount?.id)),
    [options, selectedOnMount?.id]
  );

  useEffect(() => {
    console.log({
      selectedOnMount,
      subcategoriesData,
      selectedSubcategory,
    });
    if (
      subcategoriesData?.length &&
      selectedOnMount &&
      selectedSubcategory &&
      Number(selectedSubcategory?.id) !== Number(selectedOnMount?.id)
    ) {
      dispatch(
        setSelectedSubcategory(subcategoriesData.find((item) => Number(item.id) === Number(selectedOnMount.id)))
      );
    }
  }, [subcategoriesData, dispatch, selectedOnMount, selectedSubcategory]);

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
      selectedOption={selected ?? options?.[0]}
      {...restProps}
      className="dropdown-sub-category"
    />
  );
};

export default DropdownSubCategory;
