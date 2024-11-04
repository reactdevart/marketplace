import { apiSlice } from '../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: '/oauth/token',
          method: 'POST',
          body: {
            grant_type: 'password',
            client_id: '1',
            client_secret: 'aBDFgKqt2nmulPzy2Z9Z3z7zJzh0VQxtbosE0Jwn',
            scope: '*',
            ...credentials,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApiSlice;
