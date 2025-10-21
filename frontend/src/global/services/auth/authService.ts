import { API_ROUTES } from '@/global/constants/BACKEND_URL';
import type { 
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  
  LoginResponse,
  RegisterResponse,
  LogoutResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,


} from './types';
import { apiClient } from '../apiClient';

export const authService = {

  async login(request: LoginRequest): Promise<LoginResponse>{
    return await apiClient<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      {
        method: 'POST',
        body: request,
      },
      false
    );

  },

  
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    return apiClient<RegisterResponse>(
      API_ROUTES.AUTH.REGISTER,
      {
        method: 'POST',
        body: request,
      },
      false
    );
  },

  
  async logout(): Promise<LogoutResponse> {
    return apiClient<LogoutResponse>(
      API_ROUTES.AUTH.LOGOUT,
      {
        method: 'POST',
      },
      true
    );
  },

  
  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return apiClient<ForgotPasswordResponse>(
      API_ROUTES.AUTH.FORGOT_PASSWORD,
      {
        method: 'POST',
        body: request,
      },
      false
    );
  },

 
  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return apiClient<ResetPasswordResponse>(
      API_ROUTES.AUTH.RESET_PASSWORD,
      {
        method: 'POST',
        body: request,
      },
      false
    );
  },
};