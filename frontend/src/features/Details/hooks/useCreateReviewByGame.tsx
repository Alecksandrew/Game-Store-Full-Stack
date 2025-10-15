import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type { ReviewApiResponseType } from "../types/ReviewApiResponseType";


interface ReviewFormData {
  rating: number;
  description: string;
}

export function useCreateReviewByGame(gameId: number) {
  
  return useApi<ReviewFormData, ReviewApiResponseType>(
    
    (formData: ReviewFormData) => {

      const requestBody = {
        ...formData,
        gameIgdbId: gameId,
      };

      const options = {
        method: "POST" as const,
        body: requestBody,
      };

      return apiClient(API_ROUTES.REVIEWS.CREATE_MY_REVIEW_BY_GAME_FUNCTION(gameId), options, true);
    }
  );
}