

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  verificationCode: string;
}

export interface VerifyEmailRequest {
  email: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface DownloadResponse {
  xptv: string;
  xprtv: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  verified: boolean;
  role: string;
  downloads: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
