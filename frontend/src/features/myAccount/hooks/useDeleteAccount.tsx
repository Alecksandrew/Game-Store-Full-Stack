import { useApi } from "../../../hooks/useApi";
import { myAccountRequest } from "./useUpdatePassword";
import { type ApiResponse } from "../../../types/responseApiType";

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