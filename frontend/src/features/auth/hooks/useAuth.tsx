import { useNavigate } from "react-router";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { REDIRECT_DELAY_MS } from "@/global/constants/appConfig";
import { useContext, useEffect } from "react";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/global/services/auth/types";
import { authService } from "@/global/services/auth/authService";

export function useLogin() {
  const navigate = useNavigate();
  const { handleLoginSuccess } = useContext(MyAccountContext);

  const { data, ...rest } = useRequestHandler<LoginRequest, LoginResponse>(
    authService.login
  );

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

  const { data, ...rest } = useRequestHandler<void, LogoutResponse>(
    authService.logout
  );

  useEffect(() => {
    if (data) {
      handleLogout();

      const timeout = setTimeout(
        () => navigate(PAGE_ROUTES.AUTH.LOGIN),
        REDIRECT_DELAY_MS
      );
      return () => clearTimeout(timeout);
    }
  }, [data, navigate, handleLogout]);

  return { ...rest };
}

export function useRegister() {
  return useRequestHandler<RegisterRequest, RegisterResponse>(
    authService.register
  );
}

export function useForgotPassword() {
  return useRequestHandler<ForgotPasswordRequest, ForgotPasswordResponse>(
    authService.forgotPassword
  );
}

export function useResetPassword() {
  return useRequestHandler<ResetPasswordRequest, ResetPasswordResponse>(
    authService.resetPassword
  );
}
