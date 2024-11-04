import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGeneralCategory: null,
  selectedCategory: null,
  selectedSubcategory: null,
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
      state.selectedSubcategory = action.payload;
    },
  },
});

export const { setSelectedGeneralCategory, setSelectedCategory, setSelectedSubcategory } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
