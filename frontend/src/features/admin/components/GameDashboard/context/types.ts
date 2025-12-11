import type { ReactNode } from "react";
import type { AdminGame } from "../../../types/gameDashboardTypes";

export interface KeysModalState {
  isOpen: boolean;
  gameId: number;
  gameName: string;
}

export interface GameDashboardContextType {
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
