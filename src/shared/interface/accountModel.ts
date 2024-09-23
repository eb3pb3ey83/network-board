export type AccountDetailsModalMode = 'add' | 'edit' | 'view';

export interface AccountModeData {
  account_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
  status: string;
}

export interface AccountRowData {
  id: number;
  user_name: string;
  account: number;
  status: string;
  role_id: number;
  updated_time: string;
}

export interface AccountInfo {
  id: number;
  user_name: string;
  company: {
    company_id: number;
    parent_id: number;
  };
  role_id: number;
  account: string;
  email: string;
  status: string;
  is_def_password: string;
}
