import KeysModal from "../../KeysModal/KeysModal";
import { useGameDashboardContext } from "../context";

export function Modals() {
  const { keysModal, closeKeysModal, refreshData } = useGameDashboardContext();

  const handleKeysSuccess = () => {
    closeKeysModal();
    refreshData();
  };

  return (
    <KeysModal
      isOpen={keysModal.isOpen}
      gameId={keysModal.gameId}
      gameName={keysModal.gameName}
      onClose={closeKeysModal}
      onSuccess={handleKeysSuccess}
    />
  );
}
