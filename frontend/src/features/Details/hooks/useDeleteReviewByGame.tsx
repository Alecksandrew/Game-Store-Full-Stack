import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";




export default function useDeleteReviewByGame(reviewId:number){
    return useApi<null, null>(
        () => {
          const options = {
            method: "DELETE" as const,
          };
          return apiClient(API_ROUTES.REVIEWS.DELETE_MY_REVIEW_BY_GAME_FUNCTION(reviewId), options, true);
        }
      );
}