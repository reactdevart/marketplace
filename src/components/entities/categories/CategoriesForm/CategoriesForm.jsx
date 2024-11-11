import '@/components/entities/categories/CategoriesForm/CategoriesForm.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetCategoriesForGeneralCategoryIdQuery,
  useGetSubcategoriesForCategoryIdQuery,
} from '@/store/categories/categoriesApi';
import { setSelectedCategory } from '@/store/categories/categoriesSlice';
import Dropdown from '@/components/shared/Dropdown';

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const selectedGeneralCategory = useSelector((state) => state.categories.selectedGeneralCategory);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  const { data: categories, isSuccess: isCategoriesSuccess } = useGetCategoriesForGeneralCategoryIdQuery(
    selectedGeneralCategory?.id,
    {
      skip: !selectedGeneralCategory,
    }
  );

  const { data: subcategories, isLoading } = useGetSubcategoriesForCategoryIdQuery(selectedCategory?.id, {
    skip: !selectedCategory,
  });

  console.log(isLoading);

  useEffect(() => {
    if (isCategoriesSuccess && categories?.data?.length === 1 && categories?.data[0]?.name === 'All') {
      dispatch(setSelectedCategory(categories?.data[0]));
    }
  }, [isCategoriesSuccess, categories, dispatch]);

  if (!subcategories?.data) return null;

  const onSelect = (option) => {
    console.log(option);
  };

  return (
    <div className="categories-form">
      {subcategories?.data?.[0]?.name !== 'All' && (
        <Dropdown
          options={subcategories.data}
          sllectedOption={subcategories?.data?.[0]}
          onSelect={onSelect}
          isOutsideClickEnabled
        />
      )}
    </div>
  );
};

export default CategoriesForm;
