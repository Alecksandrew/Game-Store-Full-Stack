
export interface WarningProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}