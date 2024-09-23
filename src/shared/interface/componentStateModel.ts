export interface ComponentStateModel {
  chartType: string;
  isNoticeOpen: boolean;
  isBillOpen: boolean;
  isBillRecvOpen: boolean;
  isInvoiceOpen: boolean;
  accordionOpenState: { [index: string]: boolean };
  accordionGroupOpenState: { [index: string]: boolean };
  toggleContentGroupState: { [index: string]: boolean[] };
  isPageInitialize: boolean;
}
