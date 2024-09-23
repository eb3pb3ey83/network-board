export interface AuthResponse {
  // TODO: THIS IS THE RESPONSE FROM THE BACKEND, PLEASE CONFIGURE TO MATCH YOUR BACKEND
  access_token: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refresh_token: string;
  status: number;
  success: boolean;
  userInfo: unknown;
}

export interface AuthenticatedObj {
  authenticated: boolean;
  token?: string;
}

export type UserAuthenticated = (token: string) => AuthenticatedObj;
