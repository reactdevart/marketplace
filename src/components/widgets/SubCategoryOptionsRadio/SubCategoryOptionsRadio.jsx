import '@/components/widgets/SubCategoryOptionsRadio/SubCategoryOptionsRadio.scss';

import { useSelector } from 'react-redux';

import RadioGroup from '@/components/shared/RadioGroup';
import { getSelectedSubcategoryOptions } from '@/store/categories/categoriesSlice';

const SubCategoryOptionsRadio = (props) => {
  const selectedSubcategoryOptions = useSelector(getSelectedSubcategoryOptions);

  if (!selectedSubcategoryOptions?.options?.length) return null;

  return (
    <RadioGroup
      {...props}
      options={selectedSubcategoryOptions.options}
      selectedValue={props?.value || selectedSubcategoryOptions.options?.[0]}
    />
  );
};

export default SubCategoryOptionsRadio;
