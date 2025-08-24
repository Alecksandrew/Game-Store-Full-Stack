import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import { type ApiResponse } from "@/global/types/responseApiType";

type DeleteAccountResponse = ApiResponse;

export function useDeleteAccount() {

  return useApi<void, DeleteAccountResponse>(() => {
    const options = {
      method: "DELETE" as const,
    };
    return apiClient(API_ROUTES.ACCOUNT.ME, options, true);
  });
}