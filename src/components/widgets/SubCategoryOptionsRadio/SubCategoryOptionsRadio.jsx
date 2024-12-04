import '@/components/widgets/SubCategoryOptionsRadio/SubCategoryOptionsRadio.scss';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import RadioGroup from '@/components/shared/RadioGroup';
import { getSelectedSubcategory } from '@/store/categories/categoriesSlice';

const SubCategoryOptionsRadio = (props) => {
  const selectedSubcategory = useSelector(getSelectedSubcategory);
  const selectedSubcategoryOptions = useMemo(() => {
    const optionTitles = selectedSubcategory?.optionTitles || [];
    const opts = optionTitles?.[0] || {};
    if (Object.keys(opts).length > 0) {
      if (opts?.options?.length) {
        return {
          ...opts,
          options: opts.options.map((item) => ({
            ...item,
            label: item?.name,
          })),
        };
      }
      return {};
    }
    return [];
  }, [selectedSubcategory]);

  if (!selectedSubcategoryOptions?.options?.length) return null;

  return (
    <RadioGroup
      {...props}
      options={selectedSubcategoryOptions.options}
      selectedValue={props?.value || (props?.required ? selectedSubcategoryOptions.options?.[0]?.label : '')}
    />
  );
};

export default SubCategoryOptionsRadio;
