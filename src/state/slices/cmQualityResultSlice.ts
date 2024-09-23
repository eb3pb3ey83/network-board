/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CMQualityResultSliceState } from '@/shared/interface/CMQualityResultModel';

// Initial State
const initialState: CMQualityResultSliceState = {
  result: '',
};

// Reducers
export const cmQualityResultSlice = createSlice({
  name: 'cmQualityResult',
  initialState,
  reducers: {
    setCMQualityResult: (state: CMQualityResultSliceState, { payload }: PayloadAction<string>) => {
      state.result = payload;
    },
  },
});

// Selectors
export const selectCMQualityResult = (state: { cmQualityResult: { result: string } }) => state.cmQualityResult.result;

export const { setCMQualityResult } = cmQualityResultSlice.actions;

export default cmQualityResultSlice.reducer;
