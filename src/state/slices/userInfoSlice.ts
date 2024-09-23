/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInfoSliceState } from '../../shared/interface/userInfoModel';
import { defaultTo } from 'ramda';

const defaultToEmpty = defaultTo('');

// Initial State
const initialState: UserInfoSliceState = {
  so: Number(sessionStorage.getItem('so')),
  subsid: Number(sessionStorage.getItem('subsid')),
  token: defaultToEmpty(sessionStorage.getItem('user_token')),
  name: defaultToEmpty(sessionStorage.getItem('name')),
  role: defaultToEmpty(sessionStorage.getItem('role')),
  defaultTimeout: 0,
  CMQualityTimeout: 0,
  defaultTimeoutWording: '',
  CMQualityTimeoutWording: '',
  searchWording: '',
  measureDialogTop: null,
  loadingDialogTop: null,
  display: defaultToEmpty(sessionStorage.getItem('display')),
};

// Reducers
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setMeasureDialogTop: (state: UserInfoSliceState, { payload }: PayloadAction<number>) => {
      state.measureDialogTop = payload;
    },
    setLoadingDialogTop: (state: UserInfoSliceState, { payload }: PayloadAction<number>) => {
      state.loadingDialogTop = payload;
    },
    setSO: (state: UserInfoSliceState, { payload }: PayloadAction<number>) => {
      state.so = payload;
      sessionStorage.setItem('so', String(payload));
    },
    setSubsid: (state: UserInfoSliceState, { payload }: PayloadAction<number>) => {
      state.subsid = payload;
      sessionStorage.setItem('subsid', String(payload));
    },
    setToken: (state: UserInfoSliceState, { payload }: PayloadAction<string>) => {
      state.token = payload;
      sessionStorage.setItem('user_token', String(payload));
    },
    setName: (state: UserInfoSliceState, { payload }: PayloadAction<string>) => {
      state.name = payload;
      sessionStorage.setItem('name', String(payload));
    },
    setDisplay: (state: UserInfoSliceState, { payload }: PayloadAction<string>) => {
      state.display = payload;
      sessionStorage.setItem('display', String(payload));
    },
    setRole: (state: UserInfoSliceState, { payload }: PayloadAction<string>) => {
      state.role = payload;
      sessionStorage.setItem('role', String(payload));
    },
    setSearchWording: (state: UserInfoSliceState, { payload }: PayloadAction<string>) => {
      state.searchWording = payload;
    },
    setDefaultTimeoutWording: (state: UserInfoSliceState, { payload }: PayloadAction<string>) => {
      state.defaultTimeoutWording = payload;
    },
    setCMQualityTimeoutWording: (state: UserInfoSliceState, { payload }: PayloadAction<string>) => {
      state.CMQualityTimeoutWording = payload;
    },
    setDefaultTimeout: (state: UserInfoSliceState, { payload }: PayloadAction<number>) => {
      state.defaultTimeout = payload;
    },
    setCMQualityTimeout: (state: UserInfoSliceState, { payload }: PayloadAction<number>) => {
      state.CMQualityTimeout = payload;
    },
  },
});

// Selectors
export const selectSO = (state: { userInfo: { so: number } }) => state.userInfo.so;
export const selectSubsid = (state: { userInfo: { subsid: number } }) => state.userInfo.subsid;
export const selectToken = (state: { userInfo: { token: string } }) => state.userInfo.token;
export const selectName = (state: { userInfo: { name: string } }) => state.userInfo.name;
export const selectDisplay = (state: { userInfo: { display: string } }) => state.userInfo.display;
export const selectRole = (state: { userInfo: { role: string } }) => state.userInfo.role;
export const selectSearchWording = (state: { userInfo: { searchWording: string } }) => state.userInfo.searchWording;
export const selectDefaultTimeoutWording = (state: { userInfo: { defaultTimeoutWording: string } }) => state.userInfo.defaultTimeoutWording;
export const selectCMQualityTimeoutWording = (state: { userInfo: { CMQualityTimeoutWording: string } }) => state.userInfo.CMQualityTimeoutWording;
export const selectDefaultTimeout = (state: { userInfo: { defaultTimeout: number } }) => state.userInfo.defaultTimeout;
export const selectCMQualityTimeout = (state: { userInfo: { CMQualityTimeout: number } }) => state.userInfo.CMQualityTimeout;
export const selectMeasureDialogTop = (state: { userInfo: { measureDialogTop: number | null } }) => state.userInfo.measureDialogTop;
export const selectLoadingDialogTop = (state: { userInfo: { loadingDialogTop: number | null } }) => state.userInfo.loadingDialogTop;

export const {
  setSO,
  setSubsid,
  setToken,
  setName,
  setDisplay,
  setRole,
  setSearchWording,
  setDefaultTimeoutWording,
  setCMQualityTimeoutWording,
  setDefaultTimeout,
  setCMQualityTimeout,
  setMeasureDialogTop,
  setLoadingDialogTop,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
