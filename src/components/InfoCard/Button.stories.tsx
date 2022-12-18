import { StoryObj, Meta } from "@storybook/react";
import cards from "mocks/mockCards.json";

import InfoCard from "./InfoCard";
import { InfoCardProps } from "./types";

const mockedCard = cards[1];

export default {
  title: "Components/InfoCard",
  component: InfoCard,
  args: {
    cardAlias: mockedCard.cardAlias,
    scheme: mockedCard.scheme,
    cardNumber: mockedCard.cardNumber,
    cardHolder: mockedCard.cardHolder,
    cvc: mockedCard.cvc,
    expDate: mockedCard.expDate,
  },
  argTypes: {
    expDate: {
      control: {
        type: "text",
      },
    },
    cardNumber: {
      control: {
        type: "number",
      },
    },
  },
} as Meta<InfoCardProps>;

export const Default: StoryObj<InfoCardProps> = {};
