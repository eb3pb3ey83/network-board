import { ContentObjectType } from '@/shared/constants/enums';
import { __ } from 'ramda';
import { ContentStyle, FrameContentBox, MoreBtnContentBox } from '@/model/dashboard.model';
import { getMoreBtnMethod } from '../../../utils/getMoreBtnMethod';

export const getColInfoPadding = (style: ContentStyle) => {
  return {
    sx: {
      paddingTop: style?.padding?.top,
      paddingLeft: style?.padding?.left,
      paddingBottom: style?.padding?.bottom,
      paddingRight: style?.padding?.right,
    },
  };
};

export const getListData = ({ data }: FrameContentBox) => ({
  data: data.list_data,
});

export const propsMapping = {
  [ContentObjectType.TITLE]: ({ data, style, download_all_url = '' }: FrameContentBox) => ({
    name: data.value,
    hasFlag: style.color === false ? false : true,
    download_all_url,
    icon: style.icon,
  }),
  [ContentObjectType.SUB_TITLE]: ({ data, style }: FrameContentBox) => ({
    name: data.value,
    hasFlag: false,
    hasPaddingTop: style.padding_top,
  }),
  [ContentObjectType.TITLE_MORE]: ({ data }: MoreBtnContentBox) => ({
    name: data.value,
    onMoreBtnClick: data ? getMoreBtnMethod(data) : data,
  }),
  [ContentObjectType.USER_INFO]: ({ data }: FrameContentBox) => ({
    name: data.name,
    address: data.address,
    subsid: data.subsid,
  }),
  [ContentObjectType.COL_INFO]: ({ object_no, style }: FrameContentBox) => ({
    objectNo: object_no,
    warning: style.color,
    showContent: style.display,
    ...getColInfoPadding(style),
  }),
  [ContentObjectType.COL_INFO_2]: ({ object_no, style }: FrameContentBox) => ({
    objectNo: object_no,
    warning: style.color,
    column: 1,
    ...getColInfoPadding(style),
  }),
  [ContentObjectType.SIGNAL_INFO]: ({ object_no, data }: FrameContentBox) => ({
    objectNo: object_no,
    data,
  }),
  [ContentObjectType.LINK_INFO_ICON]: (props: FrameContentBox) => props,
  [ContentObjectType.ROW_INFO_BILL]: getListData,
  [ContentObjectType.ROW_INFO_DATE]: getListData,
  [ContentObjectType.ROW_INFO_INVOICE]: ({ data }: FrameContentBox, _openNum?: number, showNum?: number) => ({
    data: data.list_data,
    showNum,
  }),
  [ContentObjectType.USER_TAG]: getListData,
  [ContentObjectType.ROW_INFO_GROUP_FIX]: getListData,
  [ContentObjectType.ROW_INFO_GROUP_REPORT]: getListData,
  [ContentObjectType.ROW_INFO_GROUP_COMPLAINT]: getListData,
  [ContentObjectType.ROW_INFO_GROUP]: ({ data, object_no }: FrameContentBox, openNum?: number, showNum?: number) => ({
    data: data.list_data,
    openNum,
    showNum,
    objectNo: object_no,
  }),
  [ContentObjectType.ROW_INFO_GROUP_TABLE]: (content: FrameContentBox) => ({ content }),
  [ContentObjectType.ADVICE_INFO]: ({ data, style }: FrameContentBox) => ({
    title: data.title,
    value: data.value,
    style,
  }),
  [ContentObjectType.ADVICE_INFO_GROUP]: getListData,
  [ContentObjectType.ROW_INFO]: getListData,
  [ContentObjectType.SEARCH_BLOCK]: ({ data }: FrameContentBox) => ({ data }),
  [ContentObjectType.TITLE_SELECT]: ({ data }: FrameContentBox) => ({ data }),
  [ContentObjectType.CHART_INFO]: ({ data }: FrameContentBox) => ({ data }),
  [ContentObjectType.SPECIAL_TAG]: ({ data }: FrameContentBox) => ({ data }),
  [ContentObjectType.FILE_INFO]: ({ data }: FrameContentBox) => ({ data }),
};
