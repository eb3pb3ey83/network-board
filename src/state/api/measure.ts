import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    measure: builder.query({
      query: ({ so, subsid, role, token, display }) => ({
        url: `/v4/${so}/${subsid}/${role}/${display}/measure`,
        method: 'GET',
        params: { token },
      }),
    }),
  }),
});

export const { useMeasureQuery } = extendedApiSlice;
