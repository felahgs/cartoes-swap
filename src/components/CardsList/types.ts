import { CardModel } from "models/card.model";

export interface CardsListProps {
  cards?: CardModel[];
  setCards: (value?: CardModel[]) => void;
}
