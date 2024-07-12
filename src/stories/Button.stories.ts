/* eslint-disable */
import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/buttons/Button";

const meta = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongTitle: Story = {
  args: {
    title: 'This is how button will look like with long title',
    type: 'button',
  },
};

export const ShortTitle: Story = {
  args: {
    title: 'Short Btn',
    type: 'button',
  },
};