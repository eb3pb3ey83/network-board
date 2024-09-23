/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SignalInfoSliceState } from '@/shared/interface/signalInfoModal';

// Initial State
const initialState: SignalInfoSliceState = {
  data: {},
};

// Reducers
export const signalInfoSlice = createSlice({
  name: 'signalInfo',
  initialState,
  reducers: {
    setSignalInfo: (state: SignalInfoSliceState, { payload }: PayloadAction<any>) => {
      state.data[payload['object_no']] = {
        style: payload.style,
        value: payload.data.value,
      };
    },
  },
});

// Selectors
export const selectSignalInfo = (state: { signalInfo: { data: { [key: string]: any } } }) => state.signalInfo.data;

export const { setSignalInfo } = signalInfoSlice.actions;

export default signalInfoSlice.reducer;
