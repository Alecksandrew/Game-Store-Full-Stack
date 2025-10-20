import { useCallback, useEffect } from "react";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import type {
  GetGamesRequest,
  GetGamesResponse,
} from "@/global/services/games/types";
import { gameService } from "@/global/services/games/gamesService";

export function usePaginatedGames(request: {
  searchTerm?: string;
  currentPage: number;
  genre?: string;
}) {

  const { currentPage, searchTerm, genre } = request;

  const { executeRequest, data, isLoading, ...rest } = useRequestHandler<
    GetGamesRequest,
    GetGamesResponse
  >(gameService.getGames);

  // it is needed in order to stop infinity loops
  const handleGetGames = useCallback(() => {
    executeRequest({ currentPage, searchTerm, genre });
  }, [executeRequest, currentPage, searchTerm, genre]);


  
  useEffect(() => {
    handleGetGames();
  }, [handleGetGames]);

  return {
    data,
    isLoading,
    handleGetGames,
    ...rest,
  };
}
