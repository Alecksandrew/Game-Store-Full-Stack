import { fetchWithAuth } from "@/global/services/fetchWithAuth";
import { type ApiErrorDetail } from "@/global/types/responseApiType";

type ApiClientOptions = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
};

export async function apiClient<TResponse>(
  url: string,
  options: ApiClientOptions = { method: "GET" },
  needsAuth?: boolean // true this gonna get jwtToken automatically
): Promise<TResponse> {
  const { method, headers, body } = options;

  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const fetcher = needsAuth ? fetchWithAuth : fetch;
  const response = await fetcher(url, fetchOptions);

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
