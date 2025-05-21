import type { Meta, StoryObj } from "@storybook/react";

import { Inline } from "../../../layout/index.ts";
import { ToggleArrow } from "../../src/ToggleArrow.tsx";

const meta = {
    title: "Components/ToggleArrow",
    component: ToggleArrow
} satisfies Meta<typeof ToggleArrow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Directions = {
    render: () => (
        <Inline>
            <ToggleArrow />
            <ToggleArrow isExpanded />
        </Inline>
    )
} satisfies Story;
