export interface LayoutDataState {
  data: LayoutData | null;
}

export interface LayoutData {
  company_name: string;
  company_background_color: string;
  company_font_color: string;
  layout_data: LayoutData;
}

export interface LayoutData {
  has_float: boolean;
  float_box: FloatBox[];
  frames: Frame[];
  notice: Notice;
}

export interface FloatBox {
  id: number;
  expand: boolean;
  header: Header;
  content_box: FloatBoxContentBox[];
  footer: Footer;
  colSpan?: number;
}

export interface FloatBoxContentBox {
  id: number;
  type: string;
  object_no: string;
  style: PurpleStyle;
  data: PurpleData;
}

export interface PurpleData {
  title: string;
  value: string;
  status: string;
}

export interface PurpleStyle {
  internal_color: string;
  external_color: string;
  measure_button: boolean;
  percent: boolean;
  progress_bar: boolean;
}

export interface Footer {
  data: Notice;
  style: Notice;
  display: boolean;
}

export interface Notice {}

export interface Header {
  display: boolean;
}

export interface Frame {
  id: number;
  expand: boolean;
  header: Header;
  content_box: FrameContentBox[];
  footer: Footer;
  colSpan?: number;
}

export interface FrameContentBox {
  id: number;
  data: FluffyData;
  type: string;
  style: FluffyStyle;
  object_no: string;
}

export interface FluffyData {
  title?: string;
  value?: null | string;
  status?: number | null | string;
  name?: string;
  address?: string;
  subsid?: string;
  url?: URLClass | string;
  type?: string;
  target?: string;
  list_data?: ListDatum[];
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

export interface FluffyStyle {
  percent?: boolean;
  progress_bar?: boolean;
  external_color?: string;
  internal_color?: string;
  measure_button?: boolean;
  color?: boolean;
  icon?: string;
}
