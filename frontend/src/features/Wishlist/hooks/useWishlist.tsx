import type { GameCardData } from "@/global/components/GameCard";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import { useCallback } from "react";

export function useAddToWishlist() {

  const addToWishlistRequest = useCallback((gameId: number) => {
    const options = {
      method: "POST" as const,
    };
    return apiClient(API_ROUTES.WISHLIST.ADD_FUNCTION(gameId), options, true);
  }, []);

  return useApi<number, unknown>(addToWishlistRequest);
}

export function useRemoveFromWishlist() {
 
  const removeFromWishlistRequest = useCallback((gameId: number) => {
    const options = {
      method: "DELETE" as const,
    };
    return apiClient(API_ROUTES.WISHLIST.REMOVE_FUNCTION(gameId), options, true);
  }, []); 

  return useApi<number, unknown>(removeFromWishlistRequest);
}

export function useGetWishlist() {
  
  const getWishlistRequest = useCallback(() => {
    const options = {
      method: "GET" as const,
    };
    return apiClient<GameCardData[]>(API_ROUTES.WISHLIST.GET, options, true);
  }, []); 

  return useApi<void, GameCardData[]>(getWishlistRequest);
}