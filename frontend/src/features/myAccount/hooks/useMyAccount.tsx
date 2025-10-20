

import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { myAccountService } from "@/global/services/myAccount/myAccountService";
import type { DeleteAccountResponse, GetMyAccountResponse, UpdatePasswordRequest, UpdatePasswordResponse } from "@/global/services/myAccount/types";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";

type GetMyAccountDetailsResponse = {
    role:string
} &  GetMyAccountResponse

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export function useGetMyAccountData() {
  const { executeRequest, ...rest } = useRequestHandler<void, GetMyAccountResponse>(
    myAccountService.getMyAccount
  );

  const decodeJwtToken = (): DecodedToken | null => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;
    return jwtDecode<DecodedToken>(token);
  };

  const handleGetMyAccount = useCallback(async (): Promise<GetMyAccountDetailsResponse | null> => {
    try {
      const accountDetails = await executeRequest();
      if (!accountDetails) return null;

      const decodedToken = decodeJwtToken();
      if (!decodedToken) return null;

      return {
        userName: accountDetails.userName,
        email: accountDetails.email,
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };
    } catch (error) {
      console.error("Failed to get and enrich user data:", error);
      return null;
    }
  }, [executeRequest]);

  return { handleGetMyAccount, ...rest };
}


export function useUpdatePassword() {
  const {executeRequest: handleUpdatePassword, ...rest} = useRequestHandler<UpdatePasswordRequest, UpdatePasswordResponse>(
    myAccountService.updatePassword
  );

  return {handleUpdatePassword, ...rest}
}

export function useDeleteAccount() {
  const {executeRequest: handleDeleteAccount, ...rest} = useRequestHandler<void, DeleteAccountResponse>(
    myAccountService.deleteAccount
  );

  return {handleDeleteAccount, ...rest}
}