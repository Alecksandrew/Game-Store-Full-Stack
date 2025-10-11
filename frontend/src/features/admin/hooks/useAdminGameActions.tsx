import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";


type UpdateGameData = {
  price: number;
  discountPrice: number;
};

export function useUpdateGame(gameId: number) {
  return useApi<UpdateGameData, void>((data) => {
    const options = {
      method: "PATCH" as const, 
      body: data,
    };

    console.log(data)
    return apiClient(`${API_ROUTES.ADMIN.GET_INVENTORY}/${gameId}/price`, options, true);
  });
}