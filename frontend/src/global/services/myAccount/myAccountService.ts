// src/global/services/myAccount/myAccountService.ts

import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type {
  GetMyAccountResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  DeleteAccountResponse,
} from "./types";
import { apiClient } from "../apiClient";

export const myAccountService = {
  
  async getMyAccount(): Promise<GetMyAccountResponse> {
    return apiClient<GetMyAccountResponse>(
      API_ROUTES.ACCOUNT.ME,
      { method: "GET" },
      true
    );
  },

  async updatePassword(
    request: UpdatePasswordRequest
  ): Promise<UpdatePasswordResponse> {
    return apiClient<UpdatePasswordResponse>(
      API_ROUTES.ACCOUNT.ME,
      {
        method: "PATCH",
        body: request,
      },
      true
    );
  },

  async deleteAccount(): Promise<DeleteAccountResponse> {
    return apiClient<DeleteAccountResponse>(
      API_ROUTES.ACCOUNT.ME,
      {
        method: "DELETE",
      },
      true
    );
  },
};
