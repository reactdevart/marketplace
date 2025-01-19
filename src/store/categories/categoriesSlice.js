import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

import { categoriesApi } from '@/store/categories/categoriesApi';

const initialState = {
  selectedGeneralCategory: null,
  selectedCategory: null,
  subcategory: {
    data: null,
    selectedSubcategory: null,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedGeneralCategory: (state, action) => {
      state.selectedGeneralCategory = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubcategory: (state, action) => {
      state.subcategory.selectedSubcategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(categoriesApi.endpoints.getSubcategoriesForCategoryId.matchFulfilled, (state, action) => {
      state.subcategory.data = action.payload?.data;
      state.subcategory.selectedSubcategory = action.payload?.data?.[0] || null;
    });
  },
});

export const { setSelectedGeneralCategory, setSelectedCategory, setSelectedSubcategory } = categoriesSlice.actions;

const selectCategoriesState = (state) => state.categories;
const selectSubcategoryState = (state) => state.categories.subcategory;

export const getSelectedGeneralCategory = createDraftSafeSelector(
  selectCategoriesState,
  (categories) => categories.selectedGeneralCategory
);

export const getSelectedCategory = createDraftSafeSelector(
  selectCategoriesState,
  (categories) => categories.selectedCategory
);

export const getSubcategoriesData = createDraftSafeSelector(selectSubcategoryState, (subcategory) => subcategory?.data);

export const getSelectedSubcategory = createDraftSafeSelector(
  selectSubcategoryState,
  (subcategory) => subcategory?.selectedSubcategory
);

export const getSubcategoriesOptions = createDraftSafeSelector(getSubcategoriesData, (data) => data);

export const getSelectedSubcategoryOptions = createDraftSafeSelector(getSelectedSubcategory, (selectedSubcategory) => {
  const optionTitles = selectedSubcategory?.optionTitles || [];
  const opts = optionTitles?.[0] || {};
  if (Object.keys(opts).length > 0 && opts?.options?.length) {
    return {
      ...opts,
      options: opts.options.map((item) => ({
        ...item,
        label: item?.name,
      })),
    };
  }
  return null;
});

export const categoriesReducer = categoriesSlice.reducer;
