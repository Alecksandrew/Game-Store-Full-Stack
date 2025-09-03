import { useCallback, useEffect } from "react";
import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type { MyReviewApiResponseType } from "../types/ReviewApiResponseType";

export function useGetMyReviewsByGame(gameId: number, version?: number) {
  const getReviewsRequest = useCallback(() => {
    if (!gameId) {
      return Promise.reject(new Error("gameId is not provided"));
    }

    const options = {
      method: "GET" as const,
    };

    return apiClient<MyReviewApiResponseType>(
      API_ROUTES.REVIEWS.GET_MY_REVIEWS_BY_GAME_FUNCTION(gameId),
      options,
      true
    );
  }, [gameId]); //Avoid renders loops

  const { data, isLoading, execute, warningComponent, warningType } = useApi<
    void,
    MyReviewApiResponseType
  >(getReviewsRequest);

  useEffect(() => {
    if (gameId) {
      execute();
    }
  }, [gameId, execute, version]);

  return { data, isLoading, warningComponent, warningType };
}
