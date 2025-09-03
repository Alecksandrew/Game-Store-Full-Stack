import { useCallback, useEffect } from "react";
import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type { ReviewApiResponseType } from "../types/ReviewApiResponseType";

export function useGetReviewsByGame(gameId: number, isUserLogged:boolean, version?: number, ) {
  
 const getReviewsRequest = useCallback(() => { 
    if (!gameId) {
      return Promise.reject(new Error("gameId is not provided"));
    }
    
    const options = {
      method: "GET" as const,
    };
    
   
    return apiClient<ReviewApiResponseType>(API_ROUTES.REVIEWS.GET_BY_GAME_FUNCTION(gameId), options, isUserLogged);//This endpoint either will return all reviews 
                                                                                                                    // or all reviews without review of the user logged

  }, [gameId])//Avoid renders loops

  
  const { data, isLoading, execute, warningComponent, warningType } = useApi<void, ReviewApiResponseType>(getReviewsRequest);

  useEffect(() => {
   
    if (gameId) {
      execute();
    }
  }, [gameId, execute, version]);

  return { data, isLoading, warningComponent, warningType };
}