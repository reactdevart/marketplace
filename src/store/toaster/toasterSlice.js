// store/toasterSlice.js
import { createSlice } from '@reduxjs/toolkit';

let idCounter = 0;

const toasterSlice = createSlice({
  name: 'toaster',
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      state.push({ ...action.payload, id: idCounter++ });
    },
    removeToast: (state, action) => {
      const newState = state.filter((toast) => toast.id !== action.payload);
      if (state.length === 1) idCounter = 0;
      return newState;
    },
  },
});

export const { addToast, removeToast } = toasterSlice.actions;
export const toasterReducer = toasterSlice.reducer;
