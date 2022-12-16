export interface ConfirmationModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}