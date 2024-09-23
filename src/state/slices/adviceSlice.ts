/**
 * Redux slice for managing userInfo-related state
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdviceSliceState } from '@/shared/interface/adviceModel';
import { BillElement } from '@/model/dashboard.model';
import { eqBy, prop, unionWith } from 'ramda';

// Initial State
const initialState: AdviceSliceState = {
  advicebb: [],
  adviceNewaq500m: [],
};

// Reducers
export const adviceSlice = createSlice({
  name: 'advice',
  initialState,
  reducers: {
    setAdvicebb: (state: AdviceSliceState, { payload }: PayloadAction<{ data: BillElement[] }>) => {
      state.advicebb = unionWith(eqBy(prop('title')), state.advicebb, payload.data);
    },
    setAdviceNewaq500m: (state: AdviceSliceState, { payload }: PayloadAction<{ data: BillElement[] }>) => {
      state.adviceNewaq500m = unionWith(eqBy(prop('title')), state.adviceNewaq500m, payload.data);
    },
  },
});

// Selectors
export const selectAdvicebb = (state: { advice: { advicebb: BillElement[] } }) => state.advice.advicebb;
export const selectAdviceNewaq500m = (state: { advice: { adviceNewaq500m: BillElement[] } }) => state.advice.adviceNewaq500m;

export const { setAdvicebb, setAdviceNewaq500m } = adviceSlice.actions;

export default adviceSlice.reducer;
