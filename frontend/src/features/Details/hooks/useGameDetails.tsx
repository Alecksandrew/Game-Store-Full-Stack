import { useEffect } from "react";
import { useParams } from "react-router";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";

import { placeholderGameData } from "../contexts/GameDetailsDataContext";
import type { GetGameDetailsResponse } from "@/global/services/games/types";
import { gameService } from "@/global/services/games/gamesService";

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
