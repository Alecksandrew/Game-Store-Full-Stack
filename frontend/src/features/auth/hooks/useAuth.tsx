import { useNavigate } from "react-router";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
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
import { useContext, useEffect } from "react";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import type { LoginRequest } from "@/global/services/auth/types";
import { authService } from "@/global/services/auth/authService";

export function useLogin() {
  const navigate = useNavigate();
  const { handleLoginSuccess } = useContext(MyAccountContext);

  const { data, ...rest } = useRequestHandler<LoginRequest, LoginResponse>(authService.login);

  useEffect(() => {
    const performLogin = async () => {
      if (data && data?.jwtTokenRes && data?.refreshTokenRes) {
        await handleLoginSuccess(data.jwtTokenRes, data.refreshTokenRes);

        const timeout = setTimeout(() => {
          navigate(PAGE_ROUTES.STORE.HOME);
        }, REDIRECT_DELAY_MS);

        return () => clearTimeout(timeout);
      }
    };

    performLogin();
  }, [data, navigate, handleLoginSuccess]);

  return { ...rest };
}

export function useLogout() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(MyAccountContext);

  const response = useRequestHandler<void, LogoutResponse>(() => {
    const options = {
      method: "POST" as const,
    };
    return apiClient(API_ROUTES.AUTH.LOGOUT, options, true);
  });

  useEffect(() => {
    if (response.data) {
      handleLogout();

      const timeout = setTimeout(
        () => navigate(PAGE_ROUTES.AUTH.LOGIN),
        REDIRECT_DELAY_MS
      );
      return () => clearTimeout(timeout);
    }
  }, [response.data, navigate]);

  return response;
}

export function useRegister() {
  return useRequestHandler<RegisterFormData, RegisterResponse>(
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
  return useRequestHandler<ForgotPassswordFormData, ForgotPasswordResponse>(
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
  return useRequestHandler<ResetPasswordFormData, ResetPasswordResponse>(
    (data: ResetPasswordFormData) => {
      const options = {
        method: "POST" as const,
        body: data,
      };
      return apiClient(API_ROUTES.AUTH.RESET_PASSWORD, options, false);
    }
  );
}
