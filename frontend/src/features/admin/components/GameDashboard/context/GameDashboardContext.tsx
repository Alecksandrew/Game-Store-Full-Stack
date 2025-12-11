import { createContext, useContext, useState, type ReactNode } from "react";
import { useGameDashboardTable } from "../../../hooks/useGameDashboardTable";
import type { GameDashboardContextType, KeysModalState } from "./types";

// ============ CONTEXT ============
const GameDashboardContext = createContext<GameDashboardContextType | null>(
  null
);

// ============ PROVIDER ============
export function GameDashboardProvider({ children }: { children: ReactNode }) {
  // Hook existente com lógica de API
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
  } = useGameDashboardTable();

  // Estado de edição
  const [editingGameId, setEditingGameId] = useState<number | null>(null);

  // Estado do modal
  const [keysModal, setKeysModal] = useState<KeysModalState>({
    isOpen: false,
    gameId: 0,
    gameName: "",
  });

  // ============ HANDLERS ============
  const cancelEditing = () => setEditingGameId(null);

  const openKeysModal = (gameId: number, gameName: string) => {
    setKeysModal({ isOpen: true, gameId, gameName });
  };

  const closeKeysModal = () => {
    setKeysModal({ isOpen: false, gameId: 0, gameName: "" });
  };

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
