import type { ApiErrorDetail, ApiResponse } from "@/global/types/responseApiType";

//!LOGIN
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message:string
  refreshTokenRes?: string;
  jwtTokenRes?: string;
};


//!REGISTER
export type RegisterRequest = {
  username:        string;
  email:           string;
  password:        string;
  confirmPassword: string;
};

export type RegisterResponse = {
  message:string,
  errors?: ApiErrorDetail[] | null;
};


//!FORGOT PASSWORD
export type ForgotPasswordRequest = {
    email: string;
};

export type ForgotPasswordResponse = ApiResponse;



//!RESET PASSWORD
export type ResetPasswordRequest = {
  email: string;
  token: string;
  newPassword:        string; 
  confirmNewPassword: string; 
};

export type ResetPasswordResponse = ApiResponse;



//!LOGOUT
export type LogoutResponse = ApiResponse;


