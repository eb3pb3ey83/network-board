/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CMQuality } from '@/model/dashboard.model';
import { eqBy, prop, sortBy, unionWith } from 'ramda';
import { CMQualitySliceState } from '@/shared/interface/CMQualityModel';

// Initial State
const initialState: CMQualitySliceState = {
  data: [],
};

// Reducers
export const cmQualitySlice = createSlice({
  name: 'cmQuality',
  initialState,
  reducers: {
    setCMQuality: (state: CMQualitySliceState, { payload }: PayloadAction<CMQuality[]>) => {
      const data = JSON.parse(JSON.stringify(state.data));
      const newData = unionWith(eqBy(prop('title')), payload, data);
      const sortedData = sortBy(prop('id'))(newData);
      state.data = sortedData;
    },
  },
});

// Selectors
export const selectCMQuality = (state: { cmQuality: { data: CMQuality[] } }) => state.cmQuality.data;

export const { setCMQuality } = cmQualitySlice.actions;

export default cmQualitySlice.reducer;
