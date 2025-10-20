import type { ApiResponse } from "@/global/types/responseApiType";
import type {
  AdminGame,
  PaginatedResponse,
} from "@/features/admin/types/gameDashboardTypes";

export type GetInventoryRequest = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  ascending?: boolean;
};

export type GetInventoryResponse = PaginatedResponse<AdminGame>;


export type UpdatePriceRequest = {
  gameId: number;
  data: {
    price: number;
    discountPrice: number;
  };
};

export type UpdatePriceResponse = ApiResponse;


export type AddKeysRequest = {
  gameId: number;
  data: {
    keys: string[];
  };
};

export type AddKeysResponse = ApiResponse;
