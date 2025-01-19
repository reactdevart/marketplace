import { createSlice } from '@reduxjs/toolkit';

import { decodeJWT, isExpired } from '@/utils/common';

const initialState = {
  user: null,
};

const credentials = JSON.parse(localStorage.getItem('auth'));

if (credentials && credentials?.access_token && credentials?.expires_in) {
  const expired = isExpired(+decodeJWT(credentials.access_token)?.iat, +credentials.expires_in);
  expired ? localStorage.removeItem('auth') : (initialState.user = credentials);
}

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
      localStorage.removeItem('auth');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
