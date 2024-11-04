import '@/components/entities/categories/CategoriesForm/CategoriesForm.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetCategoriesForGeneralCategoryIdQuery,
  useGetSubcategoriesForCategoryIdQuery,
} from '@/api/categories/categoriesApi';
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
  const { data: subcategories } = useGetSubcategoriesForCategoryIdQuery(selectedCategory?.id, {
    skip: !selectedCategory,
  });
  console.log(subcategories); // TODO: remove

  useEffect(() => {
    if (isCategoriesSuccess && categories?.data?.length === 1 && categories?.data[0]?.name === 'All') {
      dispatch(setSelectedCategory(categories?.data[0]));
    }
  }, [isCategoriesSuccess, categories, dispatch]);

  return <div className="categories-form"></div>;
};

export default CategoriesForm;
