import { Frame } from '@/model/dashboard.model';
import { LayoutType } from '../../shared/constants/enums';
import { Order, SizeBreakPoint } from '../../shared/types/general';

export interface LayoutSliceState {
  dialogLayer: number;
  layoutTransition: boolean;
  pageTitle: string;
  activeNav: string[] | null;
  menuToggled: boolean;
  dialog?: DialogProps | null;
  dialog2?: DialogProps | null;
  layoutType?: LayoutType;
  isLoadingDialogOpen?: boolean;
  isMeasureDataUpdated: boolean;
  filteredFrames: FilteredFrames[];
}

export interface FilteredFrames {
  index: number;
  frame: Frame;
}

export interface AuthSliceState {
  accessToken: string;
  // instance: AxiosInstance | undefined;
}

export interface PaginationData {
  current_page: number;
  total_pages: number;
  current_page_value_from: number;
  current_page_value_to: number;
  num_values: number;
}
export interface TableSliceState {
  tablePageManager: {
    [key: string]: number;
  };
  tableDataPerPage: number;
  tableSort: {
    order: Order | null;
    orderBy: string;
  };
  tablePagination?: PaginationData | null;
}

export interface DialogProps {
  title?: string;
  width?: number | string;
  size?: SizeBreakPoint;
  children: any;
  fullScreen?: boolean;
  /**
   *  if confirmType is set then another dialog will
   *  be opened to show the confirmation when the
   *  original dialog is closed, the value will determine
   *  which type of confirmation dialog to open
   **/
  confirmType?: number;
}
