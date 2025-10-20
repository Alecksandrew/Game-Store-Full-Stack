import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";


type UpdateGameData = {
  price: number;
  discountPrice: number;
};

export function useUpdateGame(gameId: number) {
  return useRequestHandler<UpdateGameData, void>((data) => {
    const options = {
      method: "PATCH" as const, 
      body: data,
    };

    console.log(data)
    return apiClient(`${API_ROUTES.ADMIN.GET_INVENTORY}/${gameId}/price`, options, true);
  });
}


type AddKeysData = {
  keys: string[];
};

export function useAddKeys(gameId: number) {
  return useRequestHandler<AddKeysData, void>((data) => {
    const options = {
      method: "POST" as const,
      body: data,
    };

    return apiClient(API_ROUTES.ADMIN.ADD_KEYS_FUNCTION(gameId), options, true);
  });
}