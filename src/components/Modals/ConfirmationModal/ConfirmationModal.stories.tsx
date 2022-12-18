import { StoryObj, Meta } from "@storybook/react";

import ConfirmationModal from "./ConfirmationModal";
import { ConfirmationModalProps } from "./types";

export default {
  title: "Components/Modals/ConfirmationModal",
  component: ConfirmationModal,
  args: {
    message: "Think you can trust this message?",
    show: true,
  },
  argTypes: {
    show: { control: "boolean" },
  },
  parameters: {
    docs: {
      page: null,
    },
  },
} as Meta<ConfirmationModalProps>;

export const Default: StoryObj<ConfirmationModalProps> = {};
