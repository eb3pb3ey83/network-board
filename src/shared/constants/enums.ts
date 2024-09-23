export enum NavIconName {
  HOME,
  PIE,
  ALERT,
  ANALYZER,
  DEVICE,
  SETTINGS,
  CLIPBOARD,
}

export enum ArrowDirection {
  UP,
  DOWN,
}

export enum StatusTabs {
  ALL = 0,
  CRITICAL = 1,
  URGENT = 2,
  WARNING = 3,
  UNKNOWN = 4,
}

export enum TableType {
  T1 = 'Table 1',
  T2 = 'Table 2',
  T3 = 'Table 3',
  TRole = 'Table Role 1',
  TAccount = 'Table Account 1',
}

export enum MessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export enum Delay {
  SHORT = 500,
  NORMAL = 1000,
  LONG = 3000,
}

export enum RefreshTokenIOChoice {
  GET,
  SET,
}

export enum Defaults {
  DEFAULT_HOME_ROUTE = '/example-page',
}

export enum Navs {
  EXAMPLE_PAGE = 'Example Page',
  EXAMPLE_EXPANDABLE = 'Example Expandable',
  EXAMPLE_PRIVATE_API = 'Example Private Api',
}

export enum LayoutType {
  AUTH,
  DEFAULT,
}

export enum RequestType {
  PUT = 'put',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum ContentObjectType {
  TITLE = 'title',
  TITLE_MORE = 'title-more',
  USER_INFO = 'user-info',
  COL_INFO = 'col-info',
  COL_INFO_2 = 'col-info-2',
  SIGNAL_INFO = 'signal-info',
  LINE = 'line',
  LINK_INFO_ICON = 'link-info-icon',
  ROW_INFO_BILL = 'row-info-bill',
  ROW_INFO_DATE = 'row-info-date',
  ROW_INFO_INVOICE = 'row-info-invoice',
  USER_TAG = 'user-tag',
  ADVICE_INFO = 'advice-info',
  ADVICE_INFO_GROUP = 'advice-info-group',
  ROW_INFO_GROUP_FIX = 'row-info-group-fix',
  ROW_INFO_GROUP_REPORT = 'row-info-group-report',
  ROW_INFO_GROUP_COMPLAINT = 'row-info-group-complaint',
  ROW_INFO_GROUP = 'row-info-group',
  ROW_INFO_GROUP_TABLE = 'row-info-group-table',
  ROW_INFO = 'row-info',
  SEARCH_BLOCK = 'search-block',
  TITLE_SELECT = 'title-select',
  CHART_INFO = 'chart-info',
  SPECIAL_TAG = 'special-tag',
  FILE_INFO = 'file-info',
  SUB_TITLE = 'sub-title',
  NONE = 'none',
}
