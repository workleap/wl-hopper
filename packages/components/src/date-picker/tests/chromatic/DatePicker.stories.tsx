import { Div } from "@hopper-ui/styled-system";
import { parseDate } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { ContextualHelp } from "../../../contextual-help/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { DatePicker } from "../../src/DatePicker.tsx";

const meta = {
    title: "Components/DatePicker",
    component: DatePicker,
    args: {
        "aria-label": "Select a date"
    }
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Stack>
            <Inline alignY="center">
                <DatePicker {...args} />
                <DatePicker size="sm" {...args} />
            </Inline>
            <DatePicker minValue={parseDate("2023-06-10")} maxValue={parseDate("2023-06-26")} {...args} />
            <DatePicker isDisabled {...args} />
            <DatePicker isReadOnly {...args} />
            <DatePicker isFluid {...args} />
            <Div width="10%">
                <DatePicker isFluid {...args} />
            </Div>
        </Stack>
    )
};

export const WithContextualHelp: Story = {
    render: args => (
        <DatePicker {...args} />
    ),
    decorators: [
        Story => (
            // Important for chromatic
            <Div UNSAFE_height="100px">
                <Story />
            </Div>
        )
    ],
    args: {
        "label": "Label",
        contextualHelp: <ContextualHelp isOpen>Contextual help for the DatePicker</ContextualHelp>
    }
};

export const WithLabel: Story = {
    ...Default,
    args: {
        label: "Name"
    }
};

export const Value: Story = {
    ...WithLabel,
    args: {
        ...WithLabel.args,
        defaultValue: parseDate("2023-06-16")
    }
};

export const HelperText: Story = {
    ...Default,
    args: {
        ...Default.args,
        description: "Helper message",
        errorMessage: "Error message",
        defaultValue: parseDate("2023-06-16")
    }
};

export const Validation: Story = {
    ...Default,
    args: {
        ...HelperText.args,
        isInvalid: true,
        defaultValue: parseDate("2023-06-16")
    }
};

export const Zoom: Story = {
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Inline alignY="center">
                    <DatePicker aria-label="Label" />
                    <DatePicker size="sm" aria-label="Label" />
                </Inline>
            </Div>
            <Div className="zoom-out">
                <Inline alignY="center">
                    <DatePicker aria-label="Label" />
                    <DatePicker size="sm" aria-label="Label" />
                </Inline>
            </Div>
        </Stack>
    )
};

export const Styling: Story = {
    render: () => (
        <Inline>
            <DatePicker UNSAFE_border="1px solid red" aria-label="Label" />
            <DatePicker className="bg-red" aria-label="Label" />
            <DatePicker style={{ backgroundColor: "red" }} aria-label="Label" />
        </Inline>
    )
};
