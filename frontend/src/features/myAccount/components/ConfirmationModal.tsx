import { Button } from "@/global/components/Button";


type ConfirmationModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

export default function ConfirmationModal({
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-text-secondary/40 flex items-center justify-center backdrop-blur-[2px]">
      <div className="bg-bg-secondary border-t-4 border-danger p-6 rounded-lg font-inter text-text-primary min-w-[325px] w-1/2 max-w-xl flex flex-col items-center text-center justify-around gap-4">
        <div>
          <h2 className="font-orbitron font-bold text-2xl md:text-3xl text-danger mb-2">
            {title}
          </h2>
          <p className="font-inter font-light text-sm md:text-lg xl:text-xl">
            {message}
          </p>
        </div>
        <div className="flex gap-4 w-full">
          <Button
            title={cancelButtonText}
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="bg-danger"
          >Cancel</Button>
          <Button
            title={isLoading ? "Wait..." : confirmButtonText}
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-danger" 
            >Confirm</Button>
        </div>
      </div>
    </div>
  );
}