import { baseApi } from '@/api/baseApi';

export const resetPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useResetPasswordMutation } = resetPasswordApi;
