import { ContentObjectType } from '@/shared/constants/enums';
import { __ } from 'ramda';
import { setColInfo } from '@/state/slices/colInfoSlice';
import { setChartType } from '@/state/slices/componentStateSlice';
import { setSignalInfo } from '@/state/slices/signalInfoSlice';
import { AnyAction, Dispatch } from 'redux';
import { FrameContentBox } from '@/model/dashboard.model';

export interface Dispatcher {
  dispatch: Dispatch<AnyAction>;
  content: FrameContentBox;
}

export const dispatchColInfo = ({ content, dispatch }: Dispatcher) => {
  dispatch(setColInfo(content));
};

export const dispatchTitleSelect = ({ content, dispatch }: Dispatcher) => {
  const select = Object.entries(content.data.select as {});
  dispatch(setChartType(select[0][0]));
};

export const dispatchSignalInfoStyle = ({ content, dispatch }: Dispatcher) => {
  dispatch(setSignalInfo(content));
};

export const dispatcherMapping = {
  [ContentObjectType.COL_INFO]: dispatchColInfo,
  [ContentObjectType.COL_INFO_2]: dispatchColInfo,
  [ContentObjectType.TITLE_SELECT]: dispatchTitleSelect,
  [ContentObjectType.SIGNAL_INFO]: dispatchSignalInfoStyle,
};
