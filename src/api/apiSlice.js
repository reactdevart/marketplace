import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, COMMON_HEADERS } from '@/api/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Accept', COMMON_HEADERS['Accept']);
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('result from reAuth', result);

  if (result?.error && result?.error.status === 401) {
    const refreshResult = await baseQuery({
      url: '/oauth/token',
      method: 'POST',
      body: {
        grant_type: 'refresh_token',
        client_id: '1',
        client_secret: 'aBDFgKqt2nmulPzy2Z9Z3z7zJzh0VQxtbosE0Jwn',
        scope: '*',
        refresh_token: api.getState().auth.refreshToken,
      },
    });

    console.log('refreshResult', refreshResult);

    if (refreshResult?.data) {
      // const user = api.getState().auth.user;
      api.getState().auth.user;

      // api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
      console.log('Failed to refresh token');
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
