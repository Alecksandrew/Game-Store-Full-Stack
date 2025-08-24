
export type ApiErrorDetail = {
    code: string,
    description:string
};

export interface ApiResponse {
  message: string;
  errors?: ApiErrorDetail[] | null;
}

export type LoginResponse = {
  message:string
  refreshTokenRes?: string;
  jwtTokenRes?: string;
};

export type LogoutResponse = {
  message: string
};

export type RegisterResponse = {
  message:string,
  errors?: ApiErrorDetail[] | null;
};

export type ForgotPasswordResponse = {
    message: string,
};


export type ResetPasswordResponse = {
  message: string
  errors?: ApiErrorDetail[];
};