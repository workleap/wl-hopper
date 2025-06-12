import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { ContextualHelp } from "../../../../contextual-help/index.ts";
import { FieldLabel } from "../../src/FieldLabel.tsx";

const meta = {
    title: "Components/Typography/FieldLabel",
    component: FieldLabel,
    args: {
        children: "Software built for everyone to do their best work."
    }
} satisfies Meta<typeof FieldLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        contextualHelp: <ContextualHelp>This is a contextual help</ContextualHelp>
    }
} satisfies Story;

export const WithoutContextualHelp: Story = {} satisfies Story;

export const Required: Story = {
    args: {
        ...Default.args,
        isRequired: true,
        necessityIndicator: "asterisk"
    }
};

export const Optional: Story = {
    args: {
        ...Default.args,
        necessityIndicator: "label"
    }
};

