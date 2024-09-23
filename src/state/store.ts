import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layoutSlice';
import { apiSlice } from './api/apiSlice';
import userInfoReducer from './slices/userInfoSlice';
import profileReducer from './slices/profileSlice';
import cmQualityReducer from './slices/cmQualitySlice';
import cmQualityResultReducer from './slices/cmQualityResultSlice';
import apiErrorReducer from './slices/apiErrorSlice';
import noServiceReducer from './slices/noServiceSlice';
import apiVersionReducer from './slices/apiVersionSlice';
import adviceReducer from './slices/adviceSlice';
import componentStateReducer from './slices/componentStateSlice';
import colInfoReducer from './slices/colInfoSlice';
import signalInfoReducer from './slices/signalInfoSlice';
import adviceInfoReducer from './slices/adviceInfoSlice';
import frameDataReducer from './slices/frameDataSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    userInfo: userInfoReducer,
    profile: profileReducer,
    cmQuality: cmQualityReducer,
    cmQualityResult: cmQualityResultReducer,
    apiError: apiErrorReducer,
    apiVersion: apiVersionReducer,
    noService: noServiceReducer,
    advice: adviceReducer,
    componentState: componentStateReducer,
    colInfo: colInfoReducer,
    signalInfo: signalInfoReducer,
    adviceInfo: adviceInfoReducer,
    frameData: frameDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiSlice.middleware),
});

// RootState inferred type
export type RootState = ReturnType<typeof store.getState>;
// Dispatch inferred type
export type AppDispatch = typeof store.dispatch;
