import { Modal } from "@/global/components/Modal";
import KeysForm from "../KeysForm/KeysForm";
import { useEffect, useRef } from "react";


type KeysModalProps = {
  isOpen: boolean;
  gameId: number;
  gameName: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function KeysModal({ 
  isOpen, 
  gameId, 
  gameName, 
  onClose, 
  onSuccess 
}: KeysModalProps) {

  //Logic to keep showing the name of the game when modal is fading out
  const gameNameRef = useRef(gameName);
  
  useEffect(() => {
    if (gameName) {
      gameNameRef.current = gameName;
    }
  }, [gameName]);

  const displayName = gameName || gameNameRef.current;

  return (
   <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content className="border-t-4 border-primary p-6 text-left">
        
        <KeysForm 
          gameId={gameId}
          gameName={displayName}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </Modal.Content>
    </Modal.Root>
  );
}