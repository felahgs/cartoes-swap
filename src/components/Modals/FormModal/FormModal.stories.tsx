import { StoryObj, Meta } from "@storybook/react";
import cards from "mocks/mockCards.json";

import FormModal from "./FormModal";
import { FormModalProps } from "./types";

const mockedCard = cards[0];

export default {
  title: "Components/Modals/FormModal",
  component: FormModal,
  controls: { disable: true },
  args: {
    editingCard: null,
    show: true,
  },
  argTypes: {
    show: { control: "boolean" },
    editingCard: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<FormModalProps>;

export const Adding: StoryObj<FormModalProps> = {};
export const Editing: StoryObj<FormModalProps> = {
  args: { editingCard: mockedCard },
};
