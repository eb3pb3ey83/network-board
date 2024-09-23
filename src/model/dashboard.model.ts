export interface SheetData {
  createtime: string;
  id: number;
  item: string;
}

export interface WorkSheetData extends SheetData {
  content: BillElement[];
}

export interface ComplaintData extends SheetData {
  content: string;
}

export interface UsrDashboard {
  user_profile: BillElement[];
  user_notice: BillElement[];
  cm_quality: CMQuality[];
  package: BillElement[];
  faq: CMQuality[];
  bill: BillElement[];
  bill_recv: BillRecv[];
  invoice: BillRecv[];
  more: More;
}

export interface CtiDashboard {
  user_profile: BillElement[];
  cm_quality: CMQuality[];
  traffic: BillElement[];
  traffic_advice: BillElement[];
  cti: ComplaintData[];
  list0310: ComplaintData[];
  advice_bb: BillElement[];
  advice_newaq_500m: BillElement[];
  more: { cm_quality: BillRecvClass; list0310: BillRecvClass; cti: BillRecvClass };
}

export interface EsDashBoard extends UsrDashboard {
  traffic: BillElement[];
  worksheet: WorkSheetData[];
  cti: ComplaintData[];
  list0310: ComplaintData[];
  user_notice: BillElement[];
}

export interface ManagerDashBoard extends UsrDashboard {
  traffic: BillElement[];
  cti: BillElement[];
  label: BillElement[];
  user500m: BillElement[];
  user_profile: BillElement[];
}

export interface BillElement {
  id: number;
  title: string;
  value: string | string[];
  status: string | null;
  url: BillRecvClass | null;
  separator?: string;
}

export interface BillRecvClass {
  type?: string;
  target?: string;
  value: string;
  url?: string;
}

export enum Target {
  Top = '_top',
}

export enum Type {
  Link = 'link',
}

export interface BillRecv {
  id: number;
  title: string[];
  value: string;
  status: null;
  url: BillRecvClass;
}

export interface CMQuality {
  id: number;
  title: string;
  value: number | null;
  status: null | string;
  url: BillRecvClass | null;
}

export interface More {
  bill: BillRecvClass;
  bill_recv: BillRecvClass;
  invoice: BillRecvClass;
  list0310: BillRecvClass;
  cti: BillRecvClass;
  worksheet: BillRecvClass;
  chart_traffic: BillRecvClass;
  chart_hfc: BillRecvClass;
}

// Phase 2

export interface DashboardResponse {
  Status: string;
  Message: string;
  Data: Data;
}

export interface Data {
  company_name: string;
  company_background_color: string;
  company_font_color: string;
  layout_data: LayoutData;
}

export interface LayoutData {
  has_float: boolean;
  float_box: Frame[];
  frames: Frame[];
  notice: Notice[];
}

export interface Footer {
  data: { title: string; type: string; target: string; value: string };
  style: ContentStyle;
  display: boolean;
}

export interface Notice {
  id: number;
  title: string;
  value: string;
}

export interface Header {
  data?: { title: string; type: string; target: string; value: string };
  style?: ContentStyle;
  display: boolean;
}

export interface Frame {
  id: number;
  expand: boolean;
  header: Header;
  content_box: FrameContentBox[];
  footer: Footer;
  col_span?: number;
  open_num?: number;
  show_num?: number;
}

export interface FrameContentBox {
  download_all_url?: string;
  id: number;
  data: ContentData;
  type: string;
  style: ContentStyle;
  object_no: string;
}

export interface MoreBtnContentBox extends FrameContentBox {
  data: MoreBtnContentData;
}

export interface ContentData {
  title?: string;
  sub_title?: string;
  value?: null | string;
  status?: number | null | string;
  name?: string;
  address?: string;
  subsid?: string;
  url?: URLClass | string;
  type?: string;
  target?: string;
  list_data?: ListDatum[] | TableListData;
  button?: string;
  select?: { traffic: string; hfc: string };
}

export interface TableListData {
  title: string[];
  column: { value: string[] }[];
}

export interface TableColumn {
  value: string[];
}

export interface MoreBtnContentData extends ContentData {
  url?: string;
  value: string;
}

export interface ListDatum {
  title: string[] | string;
  value: string;
  status: any;
  url: any;
}

export interface URLClass {
  type: string;
  target: string;
  value: string;
}

export interface ContentStyle {
  padding_top?: boolean;
  width?: string[];
  percent?: boolean;
  progress_bar?: boolean;
  external_color?: string;
  internal_color?: string;
  measure_button?: boolean;
  color?: boolean;
  icon?: string;
  padding?: {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
  };
  background_color?: string;
  font_color?: string;
  display?: boolean;
}
