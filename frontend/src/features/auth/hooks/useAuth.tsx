import { AUTH_URL } from "../../../BACKEND_URL";
import { useApi } from "../../../hooks/useApi";
import { type ApiErrorDetail, type ForgotPasswordResponse, type LoginResponse, type RegisterResponse, type ResetPasswordResponse } from "../../../types/responseApiType";
import type { ForgotPassswordFormData } from "../types/ForgotPasswordFormType";
import type { LoginFormData } from "../types/LoginFormType";
import type { RegisterFormData } from "../types/RegisterFormType";
import type { ResetPasswordFormData } from "../types/ResetPasswordFormType";

export async function authRequest<TData>(endpoint: string, data: TData) {
  const response = await fetch(`${AUTH_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    let errorMessage = responseData.message || "An unexpected error occurred.";
    if (responseData.errors && Array.isArray(responseData.errors)) {
      errorMessage = responseData.errors
        .map((err: ApiErrorDetail) => err.description)
        .join("\n");
    }

    throw new Error(errorMessage);
  }

  return responseData;
}


export function useLogin() {
  return useApi<LoginFormData, LoginResponse>((data: LoginFormData) => 
    authRequest("/login", data)
  );
}

export function useRegister() {
  return useApi<RegisterFormData, RegisterResponse>((data: RegisterFormData) => authRequest("/register", data));
}


export function useForgotPassword() {
  return useApi<ForgotPassswordFormData, ForgotPasswordResponse>((data: ForgotPassswordFormData) => authRequest("/forgot-password", data));
}


export function useResetPassword() {
  return useApi<ResetPasswordFormData, ResetPasswordResponse>((data: ResetPasswordFormData) => authRequest("/reset-password", data));
}