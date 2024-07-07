/* eslint-disable */

import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/buttons/Button";

const meta = { component: Button } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const LongTitle = {
  args: {
    title: "This is how button will look like with long title",
  },
} satisfies Story;

export const ShortTitle = {
  args: {
    title: "Short Btn",
  },
} satisfies Story;
