import { useEffect } from "react";
import { useParams } from "react-router";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import type { GetGameDetailsResponse } from "@/global/services/games/types";
import { gameService } from "@/global/services/games/gamesService";
import { placeholderGameData } from "../../contexts/GameDetailsDataContext";

export function useGameDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    executeRequest: handleGetGameDetails,
    data,
    isLoading,
    ...rest
  } = useRequestHandler<string, GetGameDetailsResponse>(
    gameService.getGameDetails
  );

  useEffect(() => {
    if (id) handleGetGameDetails(id);
  }, [handleGetGameDetails, id]);

  return {
    gameDetails: data ?? placeholderGameData,
    isLoading,
    ...rest,
    gameId: id,
  };
}
