import { IconNames } from "components/Icon";

export interface InfoCardProps {
  id: string
  scheme: IconNames;
  cardAlias: string;
  cardHolder: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
}