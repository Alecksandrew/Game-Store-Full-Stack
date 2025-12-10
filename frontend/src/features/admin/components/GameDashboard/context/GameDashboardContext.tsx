import { createContext, useContext, useState, type ReactNode } from "react";
import { useGameDashboardTable } from "../../../hooks/useAdmin";
import type { AdminGame } from "../../../types/gameDashboardTypes";

// ============ TIPOS ============
interface KeysModalState {
  isOpen: boolean;
  gameId: number;
  gameName: string;
}

interface GameDashboardContextType {
  // Dados da API
  gamesData: AdminGame[];
  totalCount: number;
  isLoading: boolean;
  warningType: "success" | "error" | "warning" | "info" | null;
  warningComponent: ReactNode;

  // Paginação e Filtros
  currentPage: number;
  sortBy: string;
  isAscending: boolean;
  handlePageChange: (page: number) => void;
  handleSearch: (data: { gameName: string }) => void;
  handleSort: (column: string) => void;

  // Refresh
  refreshData: () => void;

  // Estado de Edição
  editingGameId: number | null;
  setEditingGameId: (id: number | null) => void;
  cancelEditing: () => void;

  // Estado do Modal de Keys
  keysModal: KeysModalState;
  openKeysModal: (gameId: number, gameName: string) => void;
  closeKeysModal: () => void;
}

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
