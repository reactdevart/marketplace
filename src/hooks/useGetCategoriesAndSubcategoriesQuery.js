import {
  useGetCategoriesForGeneralCategoryIdQuery,
  useGetGeneralCategoriesQuery,
  useGetSubcategoriesForCategoryIdQuery,
} from '@/store/categories/categoriesApi';
import { transformGeneralListData } from '@/utils/categoryUtil';

export const useGetCategoriesAndSubcategoriesQuery = (generalCategoryId, categoryId) => {
  const generalListData = useGetGeneralCategoriesQuery(undefined, {
    selectFromResult: ({ data, ...other }) => ({
      ...other,
      data: {
        data: transformGeneralListData(data?.data),
      },
    }),
  });

  const categories = useGetCategoriesForGeneralCategoryIdQuery(generalCategoryId, {
    skip: !generalCategoryId,
  });

  const subcategories = useGetSubcategoriesForCategoryIdQuery(categoryId, {
    skip: !categoryId,
  });

  return { generalListData, categories, subcategories };
};
