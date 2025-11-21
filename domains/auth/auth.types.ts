export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}

export interface LoginResult {
  message: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}

export interface RefreshRequest {
  refreshToken?: string;
}

export interface RefreshResponse {
  success: boolean;
  accessToken: string;
}

export interface RefreshResult {
  accessToken: string;
}
