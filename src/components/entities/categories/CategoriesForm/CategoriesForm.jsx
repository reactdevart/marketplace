import '@/components/entities/categories/CategoriesForm/CategoriesForm.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetCategoriesForGeneralCategoryIdQuery,
  useGetSubcategoriesForCategoryIdQuery,
} from '@/store/categories/categoriesApi';
import { setSelectedCategory } from '@/store/categories/categoriesSlice';

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
  useGetSubcategoriesForCategoryIdQuery(selectedCategory?.id, {
    skip: !selectedCategory,
  });

  useEffect(() => {
    if (isCategoriesSuccess && categories?.data?.length === 1 && categories?.data[0]?.name === 'All') {
      dispatch(setSelectedCategory(categories?.data[0]));
    }
  }, [isCategoriesSuccess, categories, dispatch]);

  return <div className="categories-form"></div>;
};

export default CategoriesForm;
