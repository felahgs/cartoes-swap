import { StoryObj, Meta } from "@storybook/react";
import cards from "mocks/mockCards.json";

import CardsList from "./CardsList";
import { CardsListProps } from "./types";

export default {
  title: "Components/CardsList",
  component: CardsList,
  args: {
    cards: cards,
  },
  argTypes: {},
} as Meta<CardsListProps>;

export const Default: StoryObj<CardsListProps> = {};
