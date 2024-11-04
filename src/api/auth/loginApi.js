import { baseApi } from '@/api/baseApi';

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/oauth/token',
        method: 'POST',
        body: {
          grant_type: 'password',
          client_id: '1',
          client_secret: 'aBDFgKqt2nmulPzy2Z9Z3z7zJzh0VQxtbosE0Jwn',
          scope: '*',
          ...credentials,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = loginApi;
