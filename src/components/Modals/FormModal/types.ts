import { CardModel } from "models/card.model";

export interface FormModalProps {
  show: boolean;
  onClose: () => void;
  editingCard?: CardModel | null;
}