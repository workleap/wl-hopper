import { SparklesIcon } from "@hopper-ui/icons";
import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { IconList } from "../../src/IconList.tsx";

const meta = {
    title: "Components/IconList",
    component: IconList,
    args: {
        children: [
            <SparklesIcon key="1" />,
            <SparklesIcon key="2" />
        ]
    }
} satisfies Meta<typeof IconList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    args: {
        color: "primary",
        gap: "stack-xl"
    }
};
