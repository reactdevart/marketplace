import '@/components/entities/categories/CategoriesForm/CategoriesForm.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryFormRenderer from '@/components/entities/categories/CategoryFormRenderer';
import { POST_TYPES } from '@/constants/create-post';
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

  const { data: subcategories } = useGetSubcategoriesForCategoryIdQuery(selectedCategory?.id, {
    skip: !selectedCategory,
  });

  const ctaegoryForm = POST_TYPES?.[selectedGeneralCategory?.name];

  useEffect(() => {
    if (isCategoriesSuccess && categories?.data?.length === 1 && categories?.data[0]?.name === 'All') {
      dispatch(setSelectedCategory(categories?.data[0]));
    }
  }, [isCategoriesSuccess, categories, dispatch]);

  if (!subcategories?.data || !ctaegoryForm || !ctaegoryForm.subcategories?.[selectedCategory?.name]) return null;

  return (
    <div className="categories-form">
      <CategoryFormRenderer form={ctaegoryForm.subcategories?.[selectedCategory?.name]} />
    </div>
  );
};

export default CategoriesForm;
