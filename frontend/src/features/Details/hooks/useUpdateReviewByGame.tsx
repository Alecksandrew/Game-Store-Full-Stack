import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL"

interface ReviewFormData {
  rating: number;
  description: string;
}

export function useUpdateReviewByGame(reviewId: number) {
  
  return useRequestHandler<ReviewFormData, null>(
    
    (formData: ReviewFormData) => {
      

      const options = {
        method: "PATCH" as const,
        body: formData,
      };

      return apiClient(API_ROUTES.REVIEWS.UPDATE_MY_REVIEW_BY_GAME_FUNCTION(reviewId), options, true);
    }
  );
}