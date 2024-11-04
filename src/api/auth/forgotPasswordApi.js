import { baseApi } from '@/api/baseApi';

export const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: emailData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
