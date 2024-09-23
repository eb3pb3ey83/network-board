/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NoServiceSliceState } from '@/shared/interface/noServiceModel';

// Initial State
const initialState: NoServiceSliceState = {
  message: '',
};

// Reducers
export const noServiceSlice = createSlice({
  name: 'noService',
  initialState,
  reducers: {
    setNoService: (state: NoServiceSliceState, { payload }: PayloadAction<{ message: string }>) => {
      state.message = payload.message;
    },
  },
});

// Selectors
export const selectNoService = (state: { noService: { message: string } }) => state.noService;

export const { setNoService } = noServiceSlice.actions;

export default noServiceSlice.reducer;
