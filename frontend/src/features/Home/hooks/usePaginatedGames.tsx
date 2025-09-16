import { useCallback, useEffect } from "react";
import type { GameCardData } from "../types/GameCardType";
import { apiClient } from "@/global/services/apiClient";
import { useApi } from "@/global/hooks/useApi";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";

export function usePaginatedGames({

  currentPage,
  searchTerm,
  genre
}: {
  searchTerm?: string;
  currentPage: number;
  genre?:string;
}) {

  const fetchGamesForPage = useCallback(() => {
    const params = new URLSearchParams({
      page: String(currentPage),
      pageSize: "12",
    });

    if (genre) {
      params.append("genre", genre);
      params.append("rating", "80");
      params.append("yearFrom", "2014");
    } else if (searchTerm?.trim()) {
      params.append("search", searchTerm);
    } else {
      params.append("yearFrom", "2018");
      params.append("rating", "88");
    }

    const url = `${API_ROUTES.GAMES.GET}?${params.toString()}`;

    return apiClient<GameCardData[]>(url);
  }, [currentPage, searchTerm, genre]);

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
