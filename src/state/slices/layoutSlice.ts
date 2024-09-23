/**
 * Redux slice for managing layout-related state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutType } from '../../shared/constants/enums';
import { DialogProps, FilteredFrames, LayoutSliceState } from '../../shared/interface/stateModel';

// Initial State
const initialState: LayoutSliceState = {
  pageTitle: '',
  layoutTransition: true,
  dialog: null,
  dialog2: null,
  dialogLayer: 0,
  activeNav: null,
  menuToggled: false,
  isLoadingDialogOpen: false,
  isMeasureDataUpdated: false,
  filteredFrames: [],
};

// Reducers
export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setFilteredFrames: (state: LayoutSliceState, { payload }: PayloadAction<FilteredFrames[]>) => {
      state.filteredFrames = payload;
    },
    // allows for animations / transition affects when app is checking auth status
    setLayoutTransition: (state: LayoutSliceState, { payload }: PayloadAction<boolean>) => {
      state.layoutTransition = payload;
    },
    // change the global layout style
    setLayout: (state: LayoutSliceState, { payload }: PayloadAction<LayoutType>) => {
      state.layoutType = payload;
    },
    setIsMeasureDataUpdated: (state: LayoutSliceState, { payload }: PayloadAction<any>) => {
      state.isMeasureDataUpdated = payload;
    },
    setDialog: (state: LayoutSliceState, { payload }: PayloadAction<DialogProps | null>) => {
      if (payload === null) {
        // meaning about to close dialog
        if (state.dialogLayer === 1) {
          // meaning dialog1 is open and about to close dialog1
          state.dialog = payload;
          state.dialogLayer = 0;
        } else if (state.dialogLayer === 2) {
          // meaning dialog2 is open and about to close dialog2
          state.dialog2 = payload;
          state.dialogLayer = 1;
        }
      } else {
        // meaning about to open dialog
        if (state.dialogLayer === 0) {
          // meaning no dialog is open and about to open dialog1
          state.dialog = payload;
          state.dialogLayer = 1;
        } else if (state.dialogLayer === 1) {
          // meaning dialog1 is open and about to open dialog2
          state.dialog2 = payload;
          state.dialogLayer = 2;
        }
      }
    },
    setActiveNav: (state: LayoutSliceState, { payload }: PayloadAction<string>) => {
      const parts = payload.split('/').filter(Boolean);
      const result = parts.reduce((acc, part, index) => {
        const lastPart = acc.length > 0 ? acc[index - 1] : '';
        return [...acc, `${lastPart}/${part}`];
      }, [] as string[]);

      state.activeNav = result;
    },
    setMenuToggled: (state: LayoutSliceState, { payload }: PayloadAction<boolean>) => {
      state.menuToggled = payload;
    },
    setLoadingDialogOpen: (state: LayoutSliceState, { payload }: PayloadAction<boolean>) => {
      state.isLoadingDialogOpen = payload;
    },
  },
});

// Selectors

export const selectLayoutTransition = (state: { layout: { layoutTransition: boolean } }) => state.layout.layoutTransition;
export const selectLoadingDialogOpen = (state: {
  layout: {
    isLoadingDialogOpen: boolean;
  };
}) => state.layout.isLoadingDialogOpen;
export const selectLayout = (state: {
  layout: {
    layoutType: LayoutType;
  };
}) => state.layout.layoutType;

export const selectDialog = (state: {
  layout: {
    dialog: DialogProps;
  };
}) => state.layout.dialog;

export const selectDialog2 = (state: {
  layout: {
    dialog2: DialogProps;
  };
}) => state.layout.dialog2;

export const selectActiveNav = (state: {
  layout: {
    activeNav: string;
  };
}) => state.layout.activeNav;

export const selectMenuToggled = (state: {
  layout: {
    menuToggled: boolean;
  };
}) => state.layout.menuToggled;
export const selectColumns = (state: {
  layout: {
    columns: string;
  };
}) => state.layout.columns;
export const selectFilteredFrames = (state: {
  layout: {
    filteredFrames: FilteredFrames[];
  };
}) => state.layout.filteredFrames;
export const selectIsMeasureDataUpdated = (state: { layout: { isMeasureDataUpdated: boolean } }) => state.layout.isMeasureDataUpdated;
export const {
  setFilteredFrames,
  setIsMeasureDataUpdated,
  setLoadingDialogOpen,
  setLayout,
  setLayoutTransition,
  setDialog,
  setActiveNav,
  setMenuToggled,
} = layoutSlice.actions;

export default layoutSlice.reducer;
