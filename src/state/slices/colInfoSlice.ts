/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColInfoSliceState } from '@/shared/interface/colInfoModel';

// Initial State
const initialState: ColInfoSliceState = {
  data: {},
};

// Reducers
export const colInfoSlice = createSlice({
  name: 'colInfo',
  initialState,
  reducers: {
    setColInfo: (state: ColInfoSliceState, { payload }: PayloadAction<any>) => {
      state.data[payload['object_no']] = payload;
    },
  },
});

// Selectors
export const selectColInfo = (state: { colInfo: { data: { [key: string]: any } } }) => state.colInfo.data;

export const { setColInfo } = colInfoSlice.actions;

export default colInfoSlice.reducer;
