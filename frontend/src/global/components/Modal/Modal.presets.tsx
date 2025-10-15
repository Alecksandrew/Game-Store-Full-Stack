import { Button } from "../Button";
import { Modal } from "./Modal";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
}: ConfirmationModalProps) {
  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content className="border-t-4 border-danger">
        <Modal.Header title={title} className="text-danger" />
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="bg-gray-500 hover:bg-gray-600"
          >
            {cancelButtonText}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-danger hover:bg-red-700"
          >
            {isLoading ? "Wait..." : confirmButtonText}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

type NotificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
};

export function NotificationModal({ 
  isOpen, 
  onClose, 
  type, 
  message 
}: NotificationModalProps) {
  const isSuccess = type === 'success';
  const title = isSuccess ? 'Sucesso!' : 'Ocorreu um Erro!';
  const borderColor = isSuccess ? 'border-primary' : 'border-danger';
  const textColor = isSuccess ? 'text-primary' : 'text-danger';
  const buttonColor = isSuccess ? 'bg-primary' : 'bg-danger';

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content className={`border-t-4 ${borderColor}`}>
        <Modal.Header title={title} className={textColor} />
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer className="justify-center">
          <Button type="button" onClick={onClose} className={buttonColor}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}