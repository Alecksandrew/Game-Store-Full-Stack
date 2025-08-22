import { MYACCOUNT_URL } from "../../../BACKEND_URL";
import { useApi } from "../../../hooks/useApi";
import { fetchWithAuth } from "../../../services/fetchWithAuth";
import type { ApiErrorDetail } from "../../../types/responseApiType";
import type {
  UpdatePasswordFormData,
  UpdatePasswordResponse,
} from "../types/UpdatePasswordFormType";

type myAccountRequestType<TData = any> = {
  endpoint?: string;
  method: string;
  data?: TData;
};

export async function myAccountRequest<TData>({
  endpoint,
  method,
  data,
}: myAccountRequestType) {
   const url = `${MYACCOUNT_URL}${endpoint}`;
  
  const options = {
    method: method,
    body: method.toUpperCase() !== 'GET' ? JSON.stringify(data) : undefined,
    // Os headers são adicionados automaticamente pelo fetchWithAuth
  };

  const response = await fetchWithAuth(url, options);

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

export function useUpdatePassword() {
  return useApi<UpdatePasswordFormData, UpdatePasswordResponse>(
    (data: UpdatePasswordFormData) => {
      const params = {
        endpoint: "",
        method: "PATCH",
        isAuthorizationNeeded: true,
        data: data,
      };
      return myAccountRequest(params);
    }
  );
}
