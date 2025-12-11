import { Modal } from "@/global/components/Modal";
import KeysForm from "../KeysForm";
import { useEffect, useRef } from "react";
import { useAddKeys } from "../../hooks/useAddKeys";
import type { KeysModalProps } from "./types";

export default function KeysModal({
  isOpen,
  gameId,
  gameName,
  onClose,
  onSuccess,
}: KeysModalProps) {
  const { handleAddKeys, isLoading, warningComponent } = useAddKeys();

  //Logic to keep showing the name of the game when modal is fading out
  const gameNameRef = useRef(gameName);

  useEffect(() => {
    if (gameName) {
      gameNameRef.current = gameName;
    }
  }, [gameName]);

  const displayName = gameName || gameNameRef.current;

  const handleFormSubmit = async (keys: string[]) => {
    try {
      await handleAddKeys({
        gameId: gameId,
        data: { keys },
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to add keys:", error);
    }
  };

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content className="border-t-4 border-primary p-6 text-left">
        <KeysForm
          gameName={displayName}
          isLoading={isLoading}
          warningComponent={warningComponent}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </Modal.Content>
    </Modal.Root>
  );
}
