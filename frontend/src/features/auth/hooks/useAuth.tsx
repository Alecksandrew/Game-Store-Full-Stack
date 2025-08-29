import { useNavigate } from "react-router";
import { useApi } from "@/global/hooks/useApi";
import {
  type ForgotPasswordResponse,
  type LoginResponse,
  type LogoutResponse,
  type RegisterResponse,
  type ResetPasswordResponse,
} from "@/global/types/responseApiType";
import type { ForgotPassswordFormData } from "../types/ForgotPasswordFormType";
import type { LoginFormData } from "../types/LoginFormType";
import type { RegisterFormData } from "../types/RegisterFormType";
import type { ResetPasswordFormData } from "../types/ResetPasswordFormType";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { REDIRECT_DELAY_MS } from "@/global/constants/appConfig";
import { useEffect } from "react";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";

export function useLogin() {
  const navigate = useNavigate();

  const response = useApi<LoginFormData, LoginResponse>(
    (data: LoginFormData) => {
      const options = {
        method: "POST" as const,
        body: data
      };
      return apiClient(API_ROUTES.AUTH.LOGIN, options, false);
    }
  );

  useEffect(() => {
    const { data } = response;

    if (data?.jwtTokenRes && data?.refreshTokenRes) {
      localStorage.setItem("jwtToken", data.jwtTokenRes);
      localStorage.setItem("refreshToken", data.refreshTokenRes);

      const timeout = setTimeout(
        () => navigate(PAGE_ROUTES.STORE.HOME),
        REDIRECT_DELAY_MS
      );
      return () => clearTimeout(timeout);
    }
  }, [response, navigate]);

  return response;
}

export function useLogout() {
  const navigate = useNavigate();

  const response = useApi<void, LogoutResponse>(() => {
    const options = {
      method: "POST" as const,
    };
    return apiClient(API_ROUTES.AUTH.LOGOUT, options, true);
  });

  useEffect(() => {
    if (response.data) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");

      const timeout = setTimeout(() => navigate(PAGE_ROUTES.AUTH.LOGIN), REDIRECT_DELAY_MS);
      return () => clearTimeout(timeout);
    }
  }, [response.data, navigate]);

  return response;
}

export function useRegister() {
  return useApi<RegisterFormData, RegisterResponse>(
    (data: RegisterFormData) => {
      const options = {
        method: "POST" as const,
        body: data,
      };
      return apiClient(API_ROUTES.AUTH.REGISTER, options, false);
    }
  );
}

export function useForgotPassword() {
  return useApi<ForgotPassswordFormData, ForgotPasswordResponse>(
    (data: ForgotPassswordFormData) => {
      const options = {
        method: "POST" as const,
        body: data,
      };
      return apiClient(API_ROUTES.AUTH.FORGOT_PASSWORD, options, false);
    }
  );
}

export function useResetPassword() {
  return useApi<ResetPasswordFormData, ResetPasswordResponse>(
    (data: ResetPasswordFormData) => {
      const options = {
        method: "POST" as const,
        body: data,
      };
      return apiClient(API_ROUTES.AUTH.RESET_PASSWORD, options, false);
    }
  );
}
