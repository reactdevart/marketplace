import { baseApi } from '@/api/baseApi';

export const refreshTokenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/oauth/token',
        method: 'POST',
        body: {
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
          client_id: 'your-client-id',
          client_secret: 'your-client-secret',
          scope: '*',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRefreshTokenMutation } = refreshTokenApi;
