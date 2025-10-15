import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import type { MyAccountData } from "../types/myAccountTypes";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export function useGetMyAccountData() {
  const apiRequest = useCallback(
    () =>
      apiClient<MyAccountData>(API_ROUTES.ACCOUNT.ME, { method: "GET" }, true),
    []
  );

  const {
    execute: executeApi,
    isLoading,
    warningComponent,
    warningType,
  } = useApi<void, MyAccountData>(apiRequest);

  function decodeJwtToken() {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("JWT token not found in localStorage.");
    }
    const decoded = jwtDecode<DecodedToken>(token);

    return decoded;
  }

  const execute = useCallback(async (): Promise<MyAccountData | null> => {
    try {
      const accountDetails = await executeApi();
      if (!accountDetails) {
        return null;
      }

      const decodedToken = decodeJwtToken();

      const enrichedData: MyAccountData = {
        userName: accountDetails.userName,
        email: accountDetails.email,
        role: decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      };

      return enrichedData;
    } catch (error) {
      console.error("Failed to get and enrich user data:", error);
      return null;
    }
  }, [executeApi]);

  return {
    execute,
    isLoading,
    warningComponent,
    warningType,
  };
}
