import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: ({ site, so, subsid, token, name, ver }) => ({
        url: `/${ver}/${so}/${subsid}/login`,
        method: 'POST',
        body: { token, name, site },
      }),
    }),
  }),
});

export const { useUserLoginMutation } = extendedApiSlice;
