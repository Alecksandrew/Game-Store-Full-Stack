import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useApi } from "@/global/hooks/useApi";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type { GameDetailsApiResponse } from "../types/GameDetailsType";
import { placeholderGameData } from "../contexts/GameDetailsDataContext";

export function useGameDetails() {
  const { id } = useParams<{ id: string }>();

    //This callback is being used in order to avoid fetch loops within the useApi hook and apiClient service
  const getGameDetails = useCallback(() => {
    if (!id) return Promise.reject(new Error("Game ID is missing."));
    return apiClient<GameDetailsApiResponse>(
      API_ROUTES.GAMES.GET_BY_ID + `/${id}`
    );
  }, [id]);

  const { data, isLoading, execute, warningComponent, warningType } = useApi<
    null,
    GameDetailsApiResponse
  >(getGameDetails);

  useEffect(() => {
    execute(null);
  }, [execute]);

  return {
    gameDetails: data ?? placeholderGameData,
    isLoading,
    warningType,
    warningComponent,
    gameId: id,
  };
}
