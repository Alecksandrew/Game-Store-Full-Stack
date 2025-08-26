import { useCallback, useEffect, useState } from "react";
import type { GameCardData } from "../types/GameCardType";
import { apiClient } from "@/global/services/apiClient";
import { useApi } from "@/global/hooks/useApi";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";

export function usePaginatedGames() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchGamesForPage = useCallback(() => {
    const url = `${API_ROUTES.GAMES.POPULAR.SUMMARY_INFOS}?page=${currentPage}&pageSize=12`;
    return apiClient<GameCardData[]>(url);
  }, [currentPage]);

  const { data, isLoading, execute, warningComponent, warningType } = useApi<
    void,
    GameCardData[]
  >(fetchGamesForPage);

  useEffect(() => {
    execute();
  }, [execute]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return {
    data,
    isLoading,
    warningComponent,
    warningType,
    currentPage,
    handlePageChange,
  };
}
