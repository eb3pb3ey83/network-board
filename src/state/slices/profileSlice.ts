/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileSliceState } from '../../shared/interface/profileModel';
import { BillElement } from '@/model/dashboard.model';
import { differenceWith, innerJoin, update } from 'ramda';

// Initial State
const initialState: ProfileSliceState = {
  data: [],
  initialData: [],
};

// Reducers
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state: ProfileSliceState, { payload }: PayloadAction<BillElement[]>) => {
      const data = JSON.parse(JSON.stringify(state.data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let initialData: any[];
      if (data.length === 0) {
        state.initialData = payload;
        initialData = payload;
      } else {
        initialData = JSON.parse(JSON.stringify(state.initialData));
      }
      const cmp = (x: BillElement, y: BillElement) => x.title === y.title;
      const newDatas = differenceWith(cmp, payload ? payload : [], initialData);
      const oldData = innerJoin(cmp, initialData, payload ? payload : []);
      const intersection = innerJoin(cmp, payload ? payload : [], initialData);
      const newData = oldData.map((data, index) => ({
        ...data,
        status: intersection[index].status,
        value: intersection[index].value,
      }));

      newData.forEach((data) => {
        initialData = update(data.id, data, initialData);
      });
      state.data = [...initialData, ...newDatas];
    },
  },
});

// Selectors
export const selectProfile = (state: { profile: { data: BillElement[] } }) => state.profile.data;

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
