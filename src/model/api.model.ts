import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export type QueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReturnValue = QueryReturnValue<any, any, object | undefined>;
