import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '@/api/apiSlice';
import { authReducer } from '@/store/auth/authSlice';
import { categoriesReducer } from '@/store/categories/categoriesSlice';
import { toasterReducer } from '@/store/toaster/toasterSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    categories: categoriesReducer,
    toaster: toasterReducer,
    auth: authReducer,
  },
  devTools: false,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
