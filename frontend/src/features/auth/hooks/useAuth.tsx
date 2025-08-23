import { useNavigate } from "react-router";
import { AUTH_URL } from "../../../global/constants/BACKEND_URL";
import { useApi } from "@/global/hooks/useApi";
import {
  type ApiErrorDetail,
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

export async function authRequest<TData>(
  endpoint: string,
  method: string = "POST",
  isAuthorizationNeeded: boolean,
  data?: TData
) {
  let tokenHeader = {};
  if (isAuthorizationNeeded === true) {
    const jwtToken = localStorage.getItem("jwtToken");
    tokenHeader = { Authorization: `Bearer ${jwtToken}` };
  }

  const response = await fetch(`${AUTH_URL}${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...tokenHeader,
    },
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

import { useEffect } from "react";
import { fetchWithAuth } from "@/global/services/fetchWithAuth";

export function useLogin() {
  const navigate = useNavigate();

  const response = useApi<LoginFormData, LoginResponse>((data: LoginFormData) =>
    authRequest("/login", "POST", false, data)
  );

  useEffect(() => {
    if (response.data?.jwtTokenRes) {
      localStorage.setItem("jwtToken", response.data.jwtTokenRes);
    }
    if (response.data?.refreshTokenRes) {
      localStorage.setItem("refreshToken", response.data.refreshTokenRes);
    }
    if (response.data?.jwtTokenRes && response.data?.refreshTokenRes) {
      const timeout = setTimeout(() => navigate("/my-account"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [response.data, navigate]);

  return response;
}

export function useLogout() {
  const navigate = useNavigate();

  const url = AUTH_URL + "/logout"
  const options = {
    method: "POST",
  }
  const response = useApi<void, LogoutResponse>(() =>
    fetchWithAuth(url, options)
  );
  console.log(response);

  useEffect(() => {
    if (response.data) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");

      const timeout = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [response.data, navigate]);

  return response;
}

export function useRegister() {
  return useApi<RegisterFormData, RegisterResponse>((data: RegisterFormData) =>
    authRequest("/register", "POST", false, data)
  );
}

export function useForgotPassword() {
  return useApi<ForgotPassswordFormData, ForgotPasswordResponse>(
    (data: ForgotPassswordFormData) =>
      authRequest("/forgot-password", "POST", false, data)
  );
}

export function useResetPassword() {
  return useApi<ResetPasswordFormData, ResetPasswordResponse>(
    (data: ResetPasswordFormData) =>
      authRequest("/reset-password", "POST", false, data)
  );
}
