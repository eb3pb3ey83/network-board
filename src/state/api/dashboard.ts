import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.mutation({
      query: ({ role, so, subsid, signal, token, display }) => ({
        url: `/v4/data`,
        method: 'GET',
        params: { role, so, subsid, token, display },
        signal,
      }),
    }),
  }),
});

export const { useGetDataMutation } = extendedApiSlice;
