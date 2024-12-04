import { createSlice } from '@reduxjs/toolkit';

import { decodeJWT, isExpired } from '@/utils/common';

const initialState = {
  user: null,
};

const credentials = JSON.parse(localStorage.getItem('auth'));

if (credentials && credentials?.accessToken && credentials?.expiresIn) {
  const expired = isExpired(+decodeJWT(credentials?.accessToken)?.iat, +credentials?.expiresIn);
  expired ? localStorage.removeItem('auth') : (initialState.user = credentials?.user);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user = null, access_token = null, refresh_token = null, expires_in = null } = action.payload;
      localStorage.setItem(
        'auth',
        JSON.stringify({ user, accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in })
      );
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
