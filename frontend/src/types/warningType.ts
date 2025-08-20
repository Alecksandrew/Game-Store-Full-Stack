
export interface WarningProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export type warningState = {
  message: string;
  type: "success" | "error";
};