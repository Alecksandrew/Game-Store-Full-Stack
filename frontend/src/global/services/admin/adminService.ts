// src/global/services/admin/adminService.ts

import { apiClient } from "../apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type {
  GetInventoryRequest,
  GetInventoryResponse,
  UpdatePriceResponse,
  AddKeysResponse,
  AddKeysRequest,
  UpdatePriceRequest,
} from "./types";

export const adminService = {
  async getInventory(
    request: GetInventoryRequest = {}
  ): Promise<GetInventoryResponse> {

    const params = new URLSearchParams();
    if (request.page) params.append("page", String(request.page));
    if (request.pageSize) params.append("pageSize", String(request.pageSize));
    if (request.search) params.append("search", request.search);
    if (request.sortBy) params.append("sortBy", request.sortBy);
    if (request.ascending !== undefined) params.append("ascending", String(request.ascending));

    const url = `${API_ROUTES.ADMIN.GET_INVENTORY}?${params.toString()}`;
    return apiClient<GetInventoryResponse>(url, { method: "GET" }, true);
  },

  async updateGamePrice({
    gameId,
    data,
  }: UpdatePriceRequest): Promise<UpdatePriceResponse> {
    const url = API_ROUTES.ADMIN.UPDATE_INVENTORY_PRICE_FUNCTION(gameId);
    return apiClient<UpdatePriceResponse>(
      url,
      {
        method: "PATCH",
        body: data,
      },
      true
    );
  },

  async addKeys({ gameId, data }: AddKeysRequest): Promise<AddKeysResponse> {
    const url = API_ROUTES.ADMIN.ADD_KEYS_FUNCTION(gameId);
    return apiClient<AddKeysResponse>(
      url,
      {
        method: "POST",
        body: data,
      },
      true
    );
  },
};
