export interface PostData {
  data: string[];
}

export interface LoginData {
  account: string;
  password: string;
}

interface AuthApiData {
  message: string;
  success: boolean;
}

export interface AuthApiRes {
  status: number;
  data: AuthApiData;
}

/** Table **/
export interface TableData {
  count: number;
  result: TableDataResult[];
}

export interface TableDataResult {
  _id: string;
  conference: string;
  division: string;
  created: string;
  team: string;
  news: string;
  players: string[];
  coach: string;
}

export interface ApiCommonRes<T = undefined> {
  response_code: string;
  response_message: string;
  server_time: string;
  result_data: T;
}
