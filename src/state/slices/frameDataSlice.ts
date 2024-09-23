/**
 * Redux slice for managing userInfo-related state
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FrameDataModelState } from '@/shared/interface/frameDataModel';
import { Data } from '@/model/dashboard.model';

// Initial State
const initialState: FrameDataModelState = {
  data: undefined,
  filterFrameData: undefined,
  finalData: undefined,
};

// Reducers
export const frameDataSlice = createSlice({
  name: 'frameData',
  initialState,
  reducers: {
    setData: (state: FrameDataModelState, { payload }: PayloadAction<Data>) => {
      state.data = payload;
    },
    setFilterFrameData: (state: FrameDataModelState, { payload }: PayloadAction<Data>) => {
      state.filterFrameData = payload;
    },
    setFinalData: (state: FrameDataModelState, { payload }: PayloadAction<Data>) => {
      state.finalData = payload;
    },
  },
});

// Selectors
export const selectData = (state: { frameData: { data: Data } }) => state.frameData?.data;
export const selectFilterFrameData = (state: { frameData: { filterFrameData: Data } }) => state.frameData?.filterFrameData;
export const selectFinalData = (state: { frameData: { finalData: Data } }) => state.frameData?.finalData;

export const { setData, setFilterFrameData, setFinalData } = frameDataSlice.actions;

export default frameDataSlice.reducer;
