import { xuperApi } from './api';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  VerifyEmailRequest,
  VerifyEmailResponse,
  RegisterResponse
} from '../types/api.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await xuperApi.post<AuthResponse>('/xuper/login', credentials);
    return response.data;
  },

  verifyEmail: async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
    const response = await xuperApi.post<VerifyEmailResponse>('/xuper/verify-email', data);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    const response = await xuperApi.post<RegisterResponse>('/xuper/register', credentials);
    return response.data;
  },
};
