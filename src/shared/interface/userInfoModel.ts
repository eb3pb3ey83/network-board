export interface UserInfoSliceState {
  so: number;
  subsid: number;
  token: string;
  name: string;
  role: string;
  display: string;
  searchWording: string;
  defaultTimeoutWording: string;
  CMQualityTimeoutWording: string;
  defaultTimeout: number;
  CMQualityTimeout: number;
  measureDialogTop: number | null;
  loadingDialogTop: number | null;
}
