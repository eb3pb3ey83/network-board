/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiErrorSliceState } from '@/shared/interface/apiErrorModel';

// Initial State
const initialState: ApiErrorSliceState = {
  message: '',
  isError: false,
  code: '',
};

// Reducers
export const apiErrorSlice = createSlice({
  name: 'apiError',
  initialState,
  reducers: {
    setApiError: (state: ApiErrorSliceState, { payload }: PayloadAction<{ message: string; isError: boolean; code: string }>) => {
      state.message = payload.message;
      state.isError = payload.isError;
      state.code = payload.code;
    },
  },
});

// Selectors
export const selectApiError = (state: { apiError: { message: string; isError: boolean; code: string } }) => state.apiError;

export const { setApiError } = apiErrorSlice.actions;

export default apiErrorSlice.reducer;
