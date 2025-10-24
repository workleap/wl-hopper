import { MailIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { ContextualHelp } from "../../../contextual-help/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { NumberField, type NumberFieldProps } from "../../src/NumberField.tsx";

const meta = {
    title: "Components/Forms/NumberField",
    component: NumberField
} satisfies Meta<typeof NumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Stack>
            <Inline alignY="center">
                <NumberField {...args} />
                <NumberField size="sm" {...args} />
            </Inline>
            <NumberField minValue={0} maxValue={100} {...args} />
            <NumberField isDisabled {...args} />
            <NumberField isReadOnly {...args} />
            <NumberField isFluid {...args} />
            <Div width="10%">
                <NumberField isFluid {...args} />
            </Div>
        </Stack>
    ),
    args: {
        "aria-label": "Label"
    }
};

export const WithContextualHelp: Story = {
    render: args => (
        <NumberField {...args} />
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
        contextualHelp: <ContextualHelp isOpen>Contextual help for the NumberField</ContextualHelp>
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
        defaultValue: 10
    }
};

export const PrefixIcon: Story = {
    ...WithLabel,
    args: {
        ...WithLabel.args,
        prefix: <MailIcon />,
        defaultValue: 50
    }
};

export const TextIcon: Story = {
    ...WithLabel,
    args: {
        ...WithLabel.args,
        prefix: "$",
        defaultValue: 12
    }
};

export const HelperText: Story = {
    ...Default,
    args: {
        ...Default.args,
        description: "Helper message",
        errorMessage: "Error message",
        defaultValue: 100
    }
};

export const Validation: Story = {
    ...Default,
    args: {
        ...HelperText.args,
        isInvalid: true,
        defaultValue: 10
    }
};

export const Zoom: Story = {
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Inline alignY="center">
                    <NumberField aria-label="Label" />
                    <NumberField size="sm" aria-label="Label" />
                </Inline>
            </Div>
            <Div className="zoom-out">
                <Inline alignY="center">
                    <NumberField aria-label="Label" />
                    <NumberField size="sm" aria-label="Label" />
                </Inline>
            </Div>
        </Stack>
    )
};

export const Styling: Story = {
    render: () => (
        <Inline>
            <NumberField UNSAFE_border="1px solid red" aria-label="Label" />
            <NumberField className="bg-red" aria-label="Label" />
            <NumberField style={{ backgroundColor: "red" }} aria-label="Label" />
        </Inline>
    )
};

const StateTemplate = (args: Partial<NumberFieldProps>) => (
    <Stack>
        <Inline alignY="center">
            <NumberField {...args} />
            <NumberField size="sm" {...args} />
        </Inline>
        <NumberField isDisabled {...args} />
        <NumberField isReadOnly {...args} />
        <NumberField isFluid {...args} />
        <Div width="10%">
            <NumberField isFluid {...args} />
        </Div>
    </Stack>
);

export const States: Story = {
    play: ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const inputs = canvas.getAllByRole("textbox");

        inputs.forEach(input => {
            if (input.getAttribute("disabled") !== "") {
                const inputGroup = input.parentElement;
                const field = inputGroup?.parentElement;

                if (field?.getAttribute("data-chromatic-force-focus")) {
                    input.setAttribute("data-focus-visible", "true");
                    inputGroup?.setAttribute("data-focus-within", "true");
                    field?.removeAttribute("data-chromatic-force-focus");
                }

                if (field?.getAttribute("data-chromatic-force-focus-within")) {
                    inputGroup?.setAttribute("data-focus-within", "true");
                    field?.removeAttribute("data-chromatic-force-focus-within");
                }

                if (field?.getAttribute("data-chromatic-force-hover")) {
                    inputGroup?.setAttribute("data-hovered", "true");
                    input.setAttribute("data-hovered", "true");
                    field?.removeAttribute("data-chromatic-force-hover");
                }
            }
        });
    },
    render: args => {
        return (
            <Stack>
                <h1>Default</h1>
                <StateTemplate {...args} />
                <h1>Disabled</h1>
                <StateTemplate {...args} isDisabled />
                <h1>Focus Within</h1>
                <StateTemplate {...args} data-chromatic-force-focus-within />
                <h1>Focus Visible</h1>
                <StateTemplate {...args} data-chromatic-force-focus />
                <h1>Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-hover />
                <h1>Focus Visible and Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover />
            </Stack>
        );
    },
    args: {
        "aria-label": "Label",
        defaultValue: 36
    }
};
