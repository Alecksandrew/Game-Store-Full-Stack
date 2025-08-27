import { useCallback, useEffect } from "react";
import type { GameCardData } from "../types/GameCardType";
import { apiClient } from "@/global/services/apiClient";
import { useApi } from "@/global/hooks/useApi";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";

export function usePaginatedGames({
  searchTerm,
  currentPage,
}: {
  searchTerm: string;
  currentPage: number;
}) {

  const fetchGamesForPage = useCallback(() => {
    let url = "";

    if (searchTerm.trim()) {
      url = `${API_ROUTES.GAMES.GET}?search=${searchTerm}&page=${currentPage}&pageSize=12`;
    } else {
      url = `${API_ROUTES.GAMES.GET}?page=${currentPage}&pageSize=12&yearFrom=2018&rating=88`;
    }

    return apiClient<GameCardData[]>(url);
  }, [currentPage, searchTerm]);

  const { data, isLoading, execute, warningComponent, warningType } =
    useApi<void, GameCardData[]>(fetchGamesForPage);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    isLoading,
    warningComponent,
    warningType,
    currentPage,
  };
}
