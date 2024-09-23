import { apiSlice } from './apiSlice';
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    chart: builder.query({
      query: ({ so, subsid, role, name, token, ver }) => ({
        url: `/${ver}/${so}/${subsid}/${role}/chart/${name}/14`,
        method: 'GET',
        params: { token },
      }),
    }),
  }),
});

export const { useChartQuery } = extendedApiSlice;
