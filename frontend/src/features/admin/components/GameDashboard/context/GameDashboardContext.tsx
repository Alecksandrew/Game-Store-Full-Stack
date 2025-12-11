import { createContext, useContext, type ReactNode } from "react";
import { useGameDashboardTable } from "../../../hooks/useGameDashboardTable";
import type { GameDashboardContextType } from "./types";

// ============ CONTEXT ============
const GameDashboardContext = createContext<GameDashboardContextType | null>(
  null
);

// ============ PROVIDER ============
export function GameDashboardProvider({ children }: { children: ReactNode }) {
  // Hook existente com lógica de API e UI
  const {
    gamesData,
    totalCount,
    isLoading,
    warningType,
    warningComponent,
    currentPage,
    handlePageChange,
    handleSearch,
    handleSort,
    sortBy,
    isAscending,
    handleGetInventory,
    editingGameId,
    setEditingGameId,
    cancelEditing,
    keysModal,
    openKeysModal,
    closeKeysModal,
  } = useGameDashboardTable();

  const refreshData = () => {
    handleGetInventory();
  };

  // ============ VALUE ============
  const value: GameDashboardContextType = {
    gamesData,
    totalCount,
    isLoading,
    warningType,
    warningComponent,
    currentPage,
    sortBy,
    isAscending,
    handlePageChange,
    handleSearch,
    handleSort,
    refreshData,
    editingGameId,
    setEditingGameId,
    cancelEditing,
    keysModal,
    openKeysModal,
    closeKeysModal,
  };

  return (
    <GameDashboardContext.Provider value={value}>
      {children}
    </GameDashboardContext.Provider>
  );
}

// ============ HOOK ============
export function useGameDashboardContext() {
  const context = useContext(GameDashboardContext);
  if (!context) {
    throw new Error(
      "useGameDashboardContext must be used within GameDashboardProvider"
    );
  }
  return context;
}
