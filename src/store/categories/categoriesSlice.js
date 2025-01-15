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

export const getSubcategoriesData = createDraftSafeSelector(
  (state) => state.categories.subcategory?.data,
  (data) => data
);

export const getSubcategoriesOptions = createDraftSafeSelector(getSubcategoriesData, (data) => data);

export const getSelectedSubcategory = createDraftSafeSelector(
  (state) => state.categories.subcategory?.selectedSubcategory,
  (selectedSubcategory) => selectedSubcategory
);

export const categoriesReducer = categoriesSlice.reducer;
