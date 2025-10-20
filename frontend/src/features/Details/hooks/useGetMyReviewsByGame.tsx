import { useCallback, useContext, useEffect } from "react";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type { MyReviewApiResponseType } from "../types/ReviewApiResponseType";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";


export function useGetMyReviewsByGame(gameId: number, version?: number) {
  const {isLoggedIn} = useContext(MyAccountContext)
  
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

  
  const { data, isLoading, execute, warningComponent, warningType } = useRequestHandler<
    void,
    MyReviewApiResponseType
  >(getReviewsRequest);

  useEffect(() => {
    if (gameId && isLoggedIn) {
      execute();
    }
  }, [gameId, execute, version, isLoggedIn]);

  return { data, isLoading, warningComponent, warningType };
}
