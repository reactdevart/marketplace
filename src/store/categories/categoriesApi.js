import { apiSlice } from '@/api/apiSlice';

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralCategories: builder.query({
      query: () => '/api/general-categories',
    }),
    getCategoriesForGeneralCategoryId: builder.query({
      query: (generalCategoryId) => `/api/categories-from-general?general_category_id=${generalCategoryId}`,
    }),
    getSubcategoriesForCategoryId: builder.query({
      query: (categoryId) => `/api/subcategories-from-category?category_id=${categoryId}`,
    }),
    getChildOptionsForParentId: builder.query({
      query: (parentId) => `/api/get-child-options?parent_id=${parentId}`,
    }),
    getPostTypes: builder.query({
      query: () => '/api/post-types',
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGeneralCategoriesQuery,
  useGetCategoriesForGeneralCategoryIdQuery,
  useGetSubcategoriesForCategoryIdQuery,
  useGetChildOptionsForParentIdQuery,
  useGetPostTypesQuery,
} = categoriesApi;
