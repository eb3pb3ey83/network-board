/**
 * Redux slice for managing userInfo-related state
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ComponentStateModel } from '@/shared/interface/componentStateModel';

// Initial State
const initialState: ComponentStateModel = {
  isPageInitialize: false,
  chartType: '1',
  isNoticeOpen: false,
  isBillOpen: false,
  isBillRecvOpen: false,
  isInvoiceOpen: false,
  accordionOpenState: {},
  accordionGroupOpenState: {},
  toggleContentGroupState: {},
};

// Reducers
export const componentStateSlice = createSlice({
  name: 'componentState',
  initialState,
  reducers: {
    setIsPageInitialize: (state: ComponentStateModel, { payload }: PayloadAction<boolean>) => {
      state.isPageInitialize = payload;
    },
    setChartType: (state: ComponentStateModel, { payload }: PayloadAction<string>) => {
      state.chartType = payload;
    },
    setNotice: (state: ComponentStateModel, { payload }: PayloadAction<boolean>) => {
      state.isNoticeOpen = payload;
    },
    setBill: (state: ComponentStateModel, { payload }: PayloadAction<boolean>) => {
      state.isBillOpen = payload;
    },
    setBillRecv: (state: ComponentStateModel, { payload }: PayloadAction<boolean>) => {
      state.isBillRecvOpen = payload;
    },
    setInvoice: (state: ComponentStateModel, { payload }: PayloadAction<boolean>) => {
      state.isInvoiceOpen = payload;
    },
    setAccordation: (state: ComponentStateModel, { payload }: PayloadAction<{ isOpen: boolean; index: number }>) => {
      state.accordionOpenState[payload.index] = payload.isOpen;
    },
    setAccordationGroup: (state: ComponentStateModel, { payload }: PayloadAction<{ isOpen: boolean; objectNo: string }>) => {
      state.accordionGroupOpenState[payload.objectNo] = payload.isOpen;
    },
    setToggleContentGroup: (state: ComponentStateModel, { payload }: PayloadAction<{ name: string; isOpen: boolean; index: number }>) => {
      if (!state.toggleContentGroupState[payload.name]) {
        state.toggleContentGroupState[payload.name] = [];
      }
      state.toggleContentGroupState[payload.name][payload.index] = payload.isOpen;
    },
  },
});

// Selectors
export const selectChartType = (state: { componentState: { chartType: string } }) => state.componentState.chartType;
export const selectIsPageInitialize = (state: { componentState: { isPageInitialize: boolean } }) => state.componentState.isPageInitialize;
export const selectNotice = (state: { componentState: { isNoticeOpen: boolean } }) => state.componentState.isNoticeOpen;
export const selectBill = (state: { componentState: { isBillOpen: boolean } }) => state.componentState.isBillOpen;
export const selectBillRecv = (state: { componentState: { isBillRecvOpen: boolean } }) => state.componentState.isBillRecvOpen;
export const selectInvoice = (state: { componentState: { isInvoiceOpen: boolean } }) => state.componentState.isInvoiceOpen;
export const selectAccordation = (state: { componentState: { accordionOpenState: boolean[] } }) => state.componentState.accordionOpenState;
export const selectAccordationGroup = (state: { componentState: { accordionGroupOpenState: { [index: string]: boolean } } }) =>
  state.componentState.accordionGroupOpenState;
export const selectToggleContentGroup = (name: string) => (state: { componentState: { toggleContentGroupState: { [index: string]: boolean[] } } }) =>
  state.componentState.toggleContentGroupState[name];

export const {
  setIsPageInitialize,
  setChartType,
  setBillRecv,
  setBill,
  setInvoice,
  setNotice,
  setAccordationGroup,
  setAccordation,
  setToggleContentGroup,
} = componentStateSlice.actions;

export default componentStateSlice.reducer;
