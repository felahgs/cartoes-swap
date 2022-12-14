import { IconNames } from "components/Icon";

export interface InfoCardProps {
  type: IconNames;
  title: string;
  number: string;
  client: string;
  code: string;
  expDate: string;
}