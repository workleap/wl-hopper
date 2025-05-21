import { SlotProvider } from "@hopper-ui/components";
import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";
import { FieldErrorContext } from "react-aria-components";

import { ErrorMessage } from "../../src/ErrorMessage.tsx";

const meta = {
    title: "Components/Forms/ErrorMessage",
    component: ErrorMessage,
    args: {
        children: "This field is required"
    }
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: props => (
        <SlotProvider values={[
            [FieldErrorContext, {
                isInvalid: true,
                validationErrors: ["This field is required.", "This field is too long."],
                validationDetails: {} as never
            }]
        ]}
        >
            <ErrorMessage />
            <ErrorMessage hideIcon {...props} />
        </SlotProvider>
    )
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: props => (
        <SlotProvider values={[
            [FieldErrorContext, {
                isInvalid: true,
                validationErrors: [] as never[],
                validationDetails: {} as never
            }]
        ]}
        >
            <ErrorMessage border="primary" {...props} />
            <ErrorMessage className="bg-blue" {...props} />
            <ErrorMessage style={{ backgroundColor: "blue" }} {...props} />
        </SlotProvider>
    )
};

