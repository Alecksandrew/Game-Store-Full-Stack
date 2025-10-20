import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { apiClient } from "@/global/services/apiClient";
import { useCallback } from "react";

export default function useDeleteReviewByGame() {
  const deleteReview = useCallback((reviewId: number) => {
    return apiClient<null>(
      API_ROUTES.REVIEWS.DELETE_MY_REVIEW_BY_GAME_FUNCTION(reviewId),
      {
        method: "DELETE",
      },
      true
    );
  }, []);

  const { execute, isLoading, warningComponent, warningType } = useRequestHandler<
    number,
    null
  >(deleteReview);

  return { execute, isLoading, warningComponent, warningType };
}
