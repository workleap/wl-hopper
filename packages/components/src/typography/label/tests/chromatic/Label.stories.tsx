import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "../../src/Label.tsx";

const meta = {
    title: "Components/Typography/Label",
    component: Label,
    args: {
        children: "Software built for everyone to do their best work."
    }
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const Required: Story = {
    args: {
        children: "Username",
        isRequired: true,
        necessityIndicator: "asterisk"
    }
};

export const Optional: Story = {
    args: {
        children: "Username",
        necessityIndicator: "label"
    }
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: props => (
        <>
            <Label border="warning" {...props} />
            <Label className="bg-red" {...props} />
            <Label style={{ backgroundColor: "red" }} {...props} />
        </>
    )
};
