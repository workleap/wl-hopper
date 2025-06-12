import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { ContextualHelp } from "../../../contextual-help/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { PasswordField, type PasswordFieldProps } from "../../src/PasswordField.tsx";

const meta = {
    title: "Components/Forms/PasswordField",
    component: PasswordField
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Stack>
            <Inline alignY="center">
                <PasswordField {...args} />
                <PasswordField size="sm" {...args} />
            </Inline>
            <PasswordField isDisabled {...args} />
            <PasswordField isReadOnly {...args} />
            <PasswordField isFluid {...args} />
            <Div width="10%">
                <PasswordField isFluid {...args} />
            </Div>
        </Stack>
    ),
    args: {
        "aria-label": "Label"
    }
};

export const WithContextualHelp: Story = {
    render: args => (
        <PasswordField {...args} />
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
        contextualHelp: <ContextualHelp isOpen>Contextual help for the PasswordField</ContextualHelp>
    }
};

export const WithLabel: Story = {
    ...Default,
    args: {
        label: "Name"
    }
};

export const Placeholder: Story = {
    ...WithLabel,
    args: {
        ...WithLabel.args,
        placeholder: "Where to?"
    }
};

export const Value: Story = {
    ...WithLabel,
    args: {
        ...WithLabel.args,
        defaultValue: "Hop we go!"
    }
};

export const HelperText: Story = {
    ...Default,
    args: {
        ...Default.args,
        description: "Helper message",
        errorMessage: "Error message",
        defaultValue: "Hop we go!"
    }
};

export const Validation: Story = {
    ...Default,
    args: {
        ...HelperText.args,
        isInvalid: true
    }
};

export const Zoom: Story = {
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Inline alignY="center">
                    <PasswordField placeholder="Where to?" />
                    <PasswordField placeholder="Where to?" size="sm" />
                </Inline>
            </Div>
            <Div className="zoom-out">
                <Inline alignY="center">
                    <PasswordField placeholder="Where to?" />
                    <PasswordField placeholder="Where to?" size="sm" />
                </Inline>
            </Div>
        </Stack>
    )
};

export const Styling: Story = {
    render: () => (
        <Inline>
            <PasswordField UNSAFE_border="1px solid red" aria-label="Label" />
            <PasswordField className="bg-red" aria-label="Label" />
            <PasswordField style={{ backgroundColor: "red" }} aria-label="Label" />
        </Inline>
    )
};

const StateTemplate = (args: Partial<PasswordFieldProps>) => (
    <Stack>
        <Inline alignY="center">
            <PasswordField data-testid="passwordField" {...args} />
            <PasswordField data-testid="passwordField" size="sm" {...args} />
        </Inline>
        <PasswordField data-testid="passwordField" isDisabled {...args} />
        <PasswordField data-testid="passwordField" isReadOnly {...args} />
        <PasswordField data-testid="passwordField" isFluid {...args} />
        <Div width="10%">
            <PasswordField data-testid="passwordField" isFluid {...args} />
        </Div>
    </Stack>
);

export const States: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const inputs = canvas.getAllByLabelText("Label");

        inputs.forEach(input => {
            if (input.getAttribute("disabled") !== "") {
                const inputGroup = input.parentElement!;
                const field = inputGroup?.parentElement;

                if (field?.getAttribute("data-chromatic-force-focus")) {
                    inputGroup?.setAttribute("data-focus-visible", "true");
                    inputGroup?.setAttribute("data-focus-within", "true");
                    field?.removeAttribute("data-chromatic-force-focus");
                }

                if (field?.getAttribute("data-chromatic-force-focus-within")) {
                    inputGroup?.setAttribute("data-focus-within", "true");
                    field?.removeAttribute("data-chromatic-force-focus-within");
                }

                if (field?.getAttribute("data-chromatic-force-hover")) {
                    inputGroup?.setAttribute("data-hovered", "true");
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
        defaultValue: "Some random text"
    }
};
