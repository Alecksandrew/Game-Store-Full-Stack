export interface KeysModalState {
  isOpen: boolean;
  gameId: number;
  gameName: string;
}

export interface UseGameDashboardUIReturn {
  editingGameId: number | null;
  setEditingGameId: (id: number | null) => void;
  cancelEditing: () => void;
  keysModal: KeysModalState;
  openKeysModal: (gameId: number, gameName: string) => void;
  closeKeysModal: () => void;
}
