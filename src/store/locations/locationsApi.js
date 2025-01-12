import { apiSlice } from '@/api/apiSlice';

export const locationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => '/api/locations',
    }),
  }),
  overrideExisting: false,
});

export const { useGetLocationsQuery } = locationsApi;
