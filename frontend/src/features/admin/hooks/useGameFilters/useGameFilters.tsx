import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { UseGameFiltersReturn } from "./types";


export function useGameFilters(): UseGameFiltersReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("igdbId");
  const [isAscending, setIsAscending] = useState(true);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch: SubmitHandler<FieldValues> = (formData) => {
    setSearchTerm(formData.gameName ?? "");
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
    currentPage,
    searchTerm,
    sortBy,
    isAscending,
    handlePageChange,
    handleSearch,
    handleSort,
  };
}
