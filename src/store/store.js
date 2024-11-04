import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/store/auth/authSlice';
import { categoriesReducer } from '@/store/categories/categoriesSlice';
import { toasterReducer } from '@/store/toaster/toasterSlice';
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    categories: categoriesReducer,
    toaster: toasterReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
