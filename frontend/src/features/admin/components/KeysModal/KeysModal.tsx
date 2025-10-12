import KeysForm from "../KeysForm/KeysForm";


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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-text-secondary/40 flex items-center justify-center backdrop-blur-[2px]">
      <div className="bg-bg-secondary border-t-4 border-primary p-6 rounded-lg font-inter text-text-primary min-w-[400px] w-1/2 max-w-2xl">
        <KeysForm 
          gameId={gameId}
          gameName={gameName}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}