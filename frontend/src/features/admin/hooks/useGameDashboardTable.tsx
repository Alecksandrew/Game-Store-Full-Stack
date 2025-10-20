import { useState, useCallback, useEffect } from "react";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { apiClient } from "@/global/services/apiClient";
import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import type { AdminGame, PaginatedResponse } from "../types/gameDashboardTypes";
import type { FieldValues, SubmitHandler } from "react-hook-form";

export default function useGameDashboardTable() {
  const [version, setVersion] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("igdbId");
  const [isAscending, setIsAscending] = useState(true);

  const fetchDashboardGames = useCallback(() => {
    const params = new URLSearchParams({
      page: String(currentPage),
      pageSize: "10",
      sortBy: sortBy,
      ascending: String(isAscending),
    });

    if (searchTerm) {
      params.append("search", searchTerm);
    }

    const url = `${API_ROUTES.ADMIN.GET_INVENTORY}?${params.toString()}`;

    return apiClient<PaginatedResponse<AdminGame>>(
      url,
      { method: "GET" },
      true
    );
  }, [currentPage, searchTerm, sortBy, isAscending]);

  const { data, isLoading, execute, warningComponent, warningType } = useRequestHandler<
    void,
    PaginatedResponse<AdminGame>
  >(fetchDashboardGames);

  useEffect(() => {
    execute();
  }, [execute, version]);

  const refetch = () => setVersion((v) => v + 1);


  //Component which is using the hook can handle internal state
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    setSearchTerm(data.gameName ?? "");
    setCurrentPage(1); 
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setIsAscending(!isAscending);
    } else {
      setSortBy(column);
      setIsAscending(true);
    }
    setCurrentPage(1);
  };

  return {
    gamesData: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    warningType,
    warningComponent,
    currentPage,
    handlePageChange,
    handleSearch,
    handleSort,
    sortBy,
    isAscending,
    refetch
  };
}
