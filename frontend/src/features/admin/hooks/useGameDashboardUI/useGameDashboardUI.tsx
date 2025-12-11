import { useState } from "react";
import type { KeysModalState, UseGameDashboardUIReturn } from "./types";

export function useGameDashboardUI(): UseGameDashboardUIReturn {
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

  return {
    editingGameId,
    setEditingGameId,
    cancelEditing,
    keysModal,
    openKeysModal,
    closeKeysModal,
  };
}
