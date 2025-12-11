import { useGameFilters } from "../useGameFilters";
import { useGameInventory } from "../useGameInventory";
import { useGameDashboardUI } from "../useGameDashboardUI";

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

  const {
    editingGameId,
    keysModal,
    setEditingGameId,
    cancelEditing,
    openKeysModal,
    closeKeysModal,
  } = useGameDashboardUI();

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
    editingGameId,
    keysModal,
    setEditingGameId,
    cancelEditing,
    openKeysModal,
    closeKeysModal,
    ...rest,
  };
}
