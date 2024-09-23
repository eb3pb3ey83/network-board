import { ContentObjectType } from '@/shared/constants/enums';
import React from 'react';
import { __ } from 'ramda';

export const componentsMapping = {
  [ContentObjectType.TITLE]: React.lazy(() => import('../Title')),
  [ContentObjectType.SUB_TITLE]: React.lazy(() => import('../Title')),
  [ContentObjectType.TITLE_MORE]: React.lazy(() => import('../Title')),
  [ContentObjectType.USER_INFO]: React.lazy(() => import('../UserInfo')),
  [ContentObjectType.COL_INFO]: React.lazy(() => import('../ColInfo')),
  [ContentObjectType.COL_INFO_2]: React.lazy(() => import('../ColInfo')),
  [ContentObjectType.SIGNAL_INFO]: React.lazy(() => import('../CMQuality')),
  [ContentObjectType.LINE]: React.lazy(() => import('../Line')),
  [ContentObjectType.LINK_INFO_ICON]: React.lazy(() => import('../LinkInfoIcon')),
  [ContentObjectType.ROW_INFO_BILL]: React.lazy(() => import('../Bill')),
  [ContentObjectType.ROW_INFO_DATE]: React.lazy(() => import('../Bill_Recv')),
  [ContentObjectType.ROW_INFO_INVOICE]: React.lazy(() => import('../Invoice')),
  [ContentObjectType.USER_TAG]: React.lazy(() => import('../UserTag')),
  [ContentObjectType.ROW_INFO_GROUP_FIX]: React.lazy(() => import('../RowInfoGroupFix')),
  [ContentObjectType.ROW_INFO_GROUP_REPORT]: React.lazy(() => import('../RowInfoGroupReport')),
  [ContentObjectType.ROW_INFO_GROUP_COMPLAINT]: React.lazy(() => import('../RowInfoGroupComplaint')),
  [ContentObjectType.ROW_INFO_GROUP]: React.lazy(() => import('../RowInfoGroup')),
  [ContentObjectType.ROW_INFO_GROUP_TABLE]: React.lazy(() => import('../RowInfoGroupTable')),
  [ContentObjectType.ADVICE_INFO_GROUP]: React.lazy(() => import('../AdviceInfoGroup')),
  [ContentObjectType.ADVICE_INFO]: React.lazy(() => import('../AdviceInfo')),
  [ContentObjectType.ROW_INFO]: React.lazy(() => import('../RowInfo')),
  [ContentObjectType.SEARCH_BLOCK]: React.lazy(() => import('../SearchBlock')),
  [ContentObjectType.TITLE_SELECT]: React.lazy(() => import('../ChartSelect')),
  [ContentObjectType.CHART_INFO]: React.lazy(() => import('../Charts')),
  [ContentObjectType.SPECIAL_TAG]: React.lazy(() => import('../UserNotice')),
  [ContentObjectType.FILE_INFO]: React.lazy(() => import('../FileInfo')),
  [ContentObjectType.NONE]: React.lazy(() => import('../None')),
};
