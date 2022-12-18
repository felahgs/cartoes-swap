import { StoryObj, Meta } from "@storybook/react";

import Icon from "./Icon";
import { IconProps } from "./types";

export default {
  title: "Components/Icon",
  component: Icon,
  args: {},
  argTypes: {},
} as Meta<IconProps>;

export const Edit: StoryObj<IconProps> = { args: { name: "edit" } };
export const Delete: StoryObj<IconProps> = { args: { name: "delete" } };
export const Alert: StoryObj<IconProps> = { args: { name: "delete" } };
export const Discover: StoryObj<IconProps> = { args: { name: "discover" } };
export const None: StoryObj<IconProps> = { args: { name: "none" } };
export const Master: StoryObj<IconProps> = { args: { name: "mastercard" } };
export const Amex: StoryObj<IconProps> = { args: { name: "amex" } };
export const Diners: StoryObj<IconProps> = { args: { name: "diners" } };
export const Jcb: StoryObj<IconProps> = { args: { name: "jcb" } };
export const Visa: StoryObj<IconProps> = { args: { name: "visa" } };
