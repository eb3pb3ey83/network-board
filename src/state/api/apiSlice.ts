import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { QueryFn, ReturnValue } from '../../model/api.model';
import { setApiError } from '../slices/apiErrorSlice';
import { setNoService } from '../slices/noServiceSlice';

export const baseUrl = import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : `http://${document.location.protocol}`;

const baseQuery: QueryFn = fetchBaseQuery({
  baseUrl: baseUrl + import.meta.env.VITE_API_URL_NAME,
  prepareHeaders: (headers) => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
  ...(import.meta.env.VITE_WITH_CREDENTIALS === 'true' && { credentials: 'include' }),
});

const baseQueryWithReauth: QueryFn = async (args, api, extraOptions) => {
  let timeout: number = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = api.getState() as any;
  const isMeasureApi = api.endpoint === 'measure';

  if (!isMeasureApi && state.userInfo.defaultTimeout) {
    timeout = setTimeout(() => {
      api.dispatch(
        setApiError({
          isError: true,
          message: state.userInfo.defaultTimeoutWording,
          code: '9999',
        }),
      );
    }, state.userInfo.defaultTimeout * 1000);
  }

  if (isMeasureApi && state.userInfo.CMQualityTimeout) {
    timeout = setTimeout(() => {
      api.dispatch(
        setApiError({
          isError: true,
          message: state.userInfo.CMQualityTimeoutWording,
          code: '9999',
        }),
      );
    }, state.userInfo.CMQualityTimeout * 1000);
  }

  const result: ReturnValue = await baseQuery(args, api, extraOptions);
  const noService = Boolean(result.data?.message);

  if (noService) {
    api.dispatch(
      setApiError({
        isError: false,
        message: '',
        code: '0',
      }),
    );
    api.dispatch(
      setNoService({
        message: result.data?.message,
      }),
    );
  }
  clearTimeout(timeout);
  return { data: result.data };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
