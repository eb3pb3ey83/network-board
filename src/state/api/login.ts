import { apiSlice } from './apiSlice';
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ site, email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { site, email, password },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = extendedApiSlice;
