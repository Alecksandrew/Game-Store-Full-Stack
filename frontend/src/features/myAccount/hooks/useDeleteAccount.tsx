import { useApi } from "@/global/hooks/useApi";
import { myAccountRequest } from "./useUpdatePassword";
import { type ApiResponse } from "@/global/types/responseApiType";

type DeleteAccountResponse = ApiResponse;

export function useDeleteAccount() {

  return useApi<void, DeleteAccountResponse>(() => {
    const params = {
      endpoint:"",
      method: "DELETE",
    };
    return myAccountRequest(params);
  });
}