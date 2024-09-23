/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiVersionSliceState } from '@/shared/interface/apiVersionModel';

// Initial State
const initialState: ApiVersionSliceState = {
  version: window.sessionStorage.getItem('ver') || '',
};

// Reducers
export const apiVersionSlice = createSlice({
  name: 'apiVersion',
  initialState,
  reducers: {
    setApiVersion: (state: ApiVersionSliceState, { payload }: PayloadAction<{ version: string }>) => {
      state.version = payload.version;
    },
  },
});

// Selectors
export const selectApiVersion = (state: { apiVersion: { version: string } }) => state.apiVersion;

export const { setApiVersion } = apiVersionSlice.actions;

export default apiVersionSlice.reducer;
