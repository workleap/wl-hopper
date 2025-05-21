import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { OverlineText } from "../../src/OverlineText.tsx";

const meta = {
    title: "Components/Typography/OverlineText",
    component: OverlineText,
    args: {
        children: "Software built for everyone to do their best work."
    }
} satisfies Meta<typeof OverlineText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: props => (
        <OverlineText {...props} />
    )
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: props => (
        <>
            <OverlineText border="warning" {...props} />
            <OverlineText className="bg-red" {...props} />
            <OverlineText style={{ backgroundColor: "red" }} {...props} />
        </>
    )
};
