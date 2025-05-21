import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { HelperMessage } from "../../src/HelperMessage.tsx";

const meta = {
    title: "Components/Forms/HelperMessage",
    component: HelperMessage,
    args: {
        children: "Software built for everyone to do their best work."
    }
} satisfies Meta<typeof HelperMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: props => (
        <>
            <HelperMessage {...props} />
            <HelperMessage hideIcon {...props} />
        </>
    )
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: props => (
        <>
            <HelperMessage border="warning" {...props} />
            <HelperMessage className="bg-red" {...props} />
            <HelperMessage style={{ backgroundColor: "red" }} {...props} />
        </>
    )
};
