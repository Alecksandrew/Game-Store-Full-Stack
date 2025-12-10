export type KeysModalProps = {
  isOpen: boolean;
  gameId: number;
  gameName: string;
  onClose: () => void;
  onSuccess: () => void;
};
