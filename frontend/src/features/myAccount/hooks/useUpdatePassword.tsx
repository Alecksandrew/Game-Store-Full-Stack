import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import type {
  UpdatePasswordFormData,
  UpdatePasswordResponse,
} from "../types/UpdatePasswordFormType";
import { apiClient } from "@/global/services/apiClient";

export function useUpdatePassword() {
  return useRequestHandler<UpdatePasswordFormData, UpdatePasswordResponse>(
    (data: UpdatePasswordFormData) => {
      const options = {
        method: "PATCH" as const,
        body: data,
      }
      return apiClient(API_ROUTES.ACCOUNT.ME, options, true );
    }
  );
}
