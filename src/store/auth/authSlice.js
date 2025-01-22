import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

initialState.user = JSON.parse(localStorage.getItem('auth'));

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem('auth', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
