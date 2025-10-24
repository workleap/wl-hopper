import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Text } from "../../../typography/index.ts";
import { Box } from "../../src/Box.tsx";

const meta = {
    title: "Components/Box",
    component: Box,
    args: {
        children: (
            <Text>This is a box</Text>
        )
    }
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
} satisfies Story;

export const WithStyle = {
    args: {
        border: "core_amanita-100"
    }
} satisfies Story;
