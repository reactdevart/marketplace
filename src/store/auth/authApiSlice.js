import { apiSlice } from '@/api/apiSlice';

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
    registerUser: builder.mutation({
      query: (credentials) => {
        return {
          url: '/auth/register',
          method: 'POST',
          body: credentials,
        };
      },
    }),
    registerCompany: builder.mutation({
      query: (formData) => {
        return {
          url: '/auth/register-company',
          method: 'POST',
          body: formData,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: { email },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterUserMutation, useRegisterCompanyMutation, useForgotPasswordMutation } =
  authApiSlice;
