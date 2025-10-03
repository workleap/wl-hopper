import { Div } from "@hopper-ui/styled-system";
import { parseDate } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react";

import { ContextualHelp } from "../../../contextual-help/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { DateRangePicker } from "../../src/DateRangePicker.tsx";

const meta = {
    title: "Components/Forms/DateRangePicker",
    component: DateRangePicker,
    args: {
        "aria-label": "Select a date"
    }
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Stack>
            <Inline alignY="center">
                <DateRangePicker {...args} />
                <DateRangePicker size="sm" {...args} />
            </Inline>
            <DateRangePicker minValue={parseDate("2023-06-10")} maxValue={parseDate("2023-06-26")} {...args} />
            <DateRangePicker isDisabled {...args} />
            <DateRangePicker isReadOnly {...args} />
            <DateRangePicker isFluid {...args} />
            <Div width="10%">
                <DateRangePicker isFluid {...args} />
            </Div>
        </Stack>
    )
};


export const WithContextualHelp: Story = {
    render: args => (
        <DateRangePicker {...args} />
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
        contextualHelp: <ContextualHelp isOpen>Contextual help for the DateRangePicker</ContextualHelp>
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
        defaultValue: {
            start: parseDate("2023-06-16"),
            end: parseDate("2023-06-20")
        }
    }
};

export const HelperText: Story = {
    ...Default,
    args: {
        ...Default.args,
        description: "Helper message",
        errorMessage: "Error message",
        defaultValue: {
            start: parseDate("2023-06-16"),
            end: parseDate("2023-06-20")
        }
    }
};

export const Validation: Story = {
    ...Default,
    args: {
        ...HelperText.args,
        isInvalid: true,
        defaultValue: {
            start: parseDate("2023-06-16"),
            end: parseDate("2023-06-20")
        }
    }
};

export const Zoom: Story = {
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Inline alignY="center">
                    <DateRangePicker aria-label="Label" />
                    <DateRangePicker size="sm" aria-label="Label" />
                </Inline>
            </Div>
            <Div className="zoom-out">
                <Inline alignY="center">
                    <DateRangePicker aria-label="Label" />
                    <DateRangePicker size="sm" aria-label="Label" />
                </Inline>
            </Div>
        </Stack>
    )
};

export const Styling: Story = {
    render: () => (
        <Inline>
            <DateRangePicker UNSAFE_border="1px solid red" aria-label="Label" />
            <DateRangePicker className="bg-red" aria-label="Label" />
            <DateRangePicker style={{ backgroundColor: "red" }} aria-label="Label" />
        </Inline>
    )
};

