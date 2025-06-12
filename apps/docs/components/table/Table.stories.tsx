import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Table from "./Table";
import Code from "@/components/code/Code";
import Preview from "@/app/ui/tokens/preview/Preview.tsx";

const meta = {
    title: "components/Table",
    component: Table
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        head: ["Position", "Mass", "Symbol", "Name"],
        data: [
            { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
            { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
            { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
            { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
            { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" }
        ]
    }
};

export const Tokens: Story = {
    args: {
        lastColumnAlignment: "right",
        head: ["Token", "Value", "Preview"],
        data: [
            {
                name: <Code value="--hop-sapphire-200">--hop-sapphire-200</Code>,
                value: "#95b1ff",
                preview: <Preview value="#95b1ff" name="--hop-sapphire-200" category="react" />
            },
            {
                name: <Code value="--hop-primary-surface-disabled">--hop-primary-surface-disabled</Code>,
                value: "#95b1ff",
                preview: <Preview value="#95b1ff" name="--hop-primary-surface-disabled" category="react" />
            },
            {
                name: <Code value="--hop-primary-surface-disabled">--hop-primary-surface-disabled</Code>,
                value: "#2040c7",
                preview: <Preview value="#2040c7" name="--hop-primary-surface-disabled" category="react" />
            }
        ]
    }
};
