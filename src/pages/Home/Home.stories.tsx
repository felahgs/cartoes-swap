import { StoryObj } from "@storybook/react";
import cards from "mocks/mockCards.json";

import Home from "./Home";

export default {
  title: "Pages/Home",
  component: Home,
  args: {
    cards: cards,
  },
  argTypes: {},
};

export const Primary: StoryObj = {};
