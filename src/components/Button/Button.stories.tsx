import { StoryObj, Meta } from "@storybook/react";

import Button from "./Button";
import { ButtonProps } from "./types";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Click me!",
    variant: "primary",
  },
  argTypes: {
    variant: [
      "primary",
      "secondary",
      "outline-primary",
      "outline-secondary",
      "link",
      "danger",
    ],
    size: {
      options: ["sm", "default", "lg"],
      control: {
        type: "inline-radio",
      },
    },
  },
} as Meta<ButtonProps>;

export const Primary: StoryObj<ButtonProps> = {};
export const Secondary: StoryObj<ButtonProps> = {
  args: { variant: "secondary" },
};
export const OutlinePrimary: StoryObj<ButtonProps> = {
  args: { variant: "outline-primary" },
};
export const OutlineSecondary: StoryObj<ButtonProps> = {
  args: { variant: "outline-secondary" },
};
export const Link: StoryObj<ButtonProps> = { args: { variant: "link" } };
export const Danger: StoryObj<ButtonProps> = { args: { variant: "danger" } };
