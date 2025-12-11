import { useGameFilters } from "../useGameFilters";
import { useGameInventory } from "../useGameInventory";

export function useGameDashboardTable() {
  const {
    currentPage,
    searchTerm,
    sortBy,
    isAscending,
    handlePageChange,
    handleSearch,
    handleSort,
  } = useGameFilters();

  const { gamesData, totalCount, isLoading, handleGetInventory, ...rest } =
    useGameInventory({
      currentPage,
      searchTerm,
      sortBy,
      isAscending,
    });

  return {
    gamesData,
    totalCount,
    isLoading,
    handleGetInventory,
    currentPage,
    handlePageChange,
    handleSearch,
    handleSort,
    sortBy,
    isAscending,
    ...rest,
  };
}
