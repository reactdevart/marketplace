import { baseApi } from '@/api/baseApi';

export const registerCompanyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerCompany: builder.mutation({
      query: (formData) => ({
        url: '/auth/register-company',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterCompanyMutation } = registerCompanyApi;
