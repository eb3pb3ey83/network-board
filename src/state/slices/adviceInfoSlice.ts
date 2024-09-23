/**
 * Redux slice for managing userInfo-related state
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdviceInfoSliceState } from '@/shared/interface/adviceInfoModel';

// Initial State
const initialState: AdviceInfoSliceState = {
  newAdviceInfo: [],
};

// Reducers
export const adviceSlice = createSlice({
  name: 'advice',
  initialState,
  reducers: {
    setNewAdviceInfo: (state: AdviceInfoSliceState, { payload }: PayloadAction<any[]>) => {
      state.newAdviceInfo = payload;
    },
  },
});

// Selectors
export const selectNewAdviceInfo = (state: { adviceInfo: { newAdviceInfo: any[] } }) => state.adviceInfo.newAdviceInfo;

export const { setNewAdviceInfo } = adviceSlice.actions;

export default adviceSlice.reducer;
