export interface MeasureData {
  object_no: string;
  style: MeasureDataStyle;
  status: string;
  value: string;
  data: MeasureDataColInfo[];
  suggestion: MeasureDataSuggestion;
}

export interface MeasureDataStyle {
  internal_color: string;
  external_color: string;
  measure_button: boolean;
  percent: boolean;
  progress_bar: boolean;
}

export interface MeasureDataColInfo {
  id: number;
  type: string;
  object_no: string;
  style: Style2;
  data: ColInfoData;
}

export interface Style2 {}

export interface ColInfoData {
  title: string;
  value: string;
  status: any;
}

export interface MeasureDataSuggestion {
  list_data: {} | ListData[];
}

export interface ListData {
  title: string;
  value: string;
}
