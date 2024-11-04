// src/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAuthHeader } from '@/api/authHeaderHelper';
import { API_BASE_URL, COMMON_HEADERS } from '@/api/constants';
import { clearToken, getToken, setToken } from '@/api/tokenHelper';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const authHeader = getAuthHeader();
    headers.set('Accept', COMMON_HEADERS['Accept']);

    if (authHeader.Authorization) {
      headers.set('Authorization', authHeader.Authorization);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getToken('refresh_token');
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/oauth/token',
          method: 'POST',
          body: {
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            client_id: 'your-client-id',
            client_secret: 'your-client-secret',
            scope: '*',
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        setToken(refreshResult.data.access_token);
        result = await baseQuery(args, api, extraOptions);
      } else {
        clearToken();
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
