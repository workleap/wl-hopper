import { MailIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";

import { ContextualHelp } from "../../../contextual-help/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { TextField, type TextFieldProps } from "../../src/TextField.tsx";

const meta = {
    title: "Components/Forms/TextField",
    component: TextField
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Stack>
            <Inline alignY="center">
                <TextField {...args} />
                <TextField size="sm" {...args} />
            </Inline>
            <TextField isDisabled {...args} />
            <TextField isReadOnly {...args} />
            <TextField isFluid {...args} />
            <Div width="10%">
                <TextField isFluid {...args} />
            </Div>
            <TextField showCharacterCount maxLength={20} {...args} />
            <TextField showCharacterCount maxLength={20} isClearable {...args} />
            <TextField showCharacterCount maxLength={8} allowExceedingMaxLength {...args} />
            <TextField isClearable {...args} />
        </Stack>
    ),
    args: {
        "aria-label": "Label"
    }
};

export const WithContextualHelp: Story = {
    render: args => (
        <TextField {...args} />
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
        contextualHelp: <ContextualHelp isOpen>Contextual help for the TextField</ContextualHelp>
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

export const PrefixIcon: Story = {
    ...WithLabel,
    args: {
        ...WithLabel.args,
        prefix: <MailIcon />,
        defaultValue: "Hop we go!"
    }
};

export const TextIcon: Story = {
    ...WithLabel,
    args: {
        ...WithLabel.args,
        prefix: "$",
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
    render: args => (
        <Stack>
            <Div className="zoom-in">
                <Inline alignY="center">
                    <TextField {...args} placeholder="Where to?" />
                    <TextField {...args} placeholder="Where to?" size="sm" />
                </Inline>
            </Div>
            <Div className="zoom-out">
                <Inline alignY="center">
                    <TextField {...args} placeholder="Where to?" />
                    <TextField {...args} placeholder="Where to?" size="sm" />
                </Inline>
            </Div>
        </Stack>
    ),
    args: {
        "aria-label": "Place"
    }
};

export const Styling: Story = {
    render: args => (
        <Inline>
            <TextField {...args} UNSAFE_border="1px solid red" aria-label="Label" />
            <TextField {...args} className="bg-red" aria-label="Label" />
            <TextField {...args} style={{ backgroundColor: "red" }} aria-label="Label" />
        </Inline>
    )
};

const StateTemplate = (args: Partial<TextFieldProps>) => (
    <Stack>
        <Inline alignY="center">
            <TextField {...args} />
            <TextField size="sm" {...args} />
        </Inline>
        <TextField isDisabled {...args} />
        <TextField isReadOnly {...args} />
        <TextField isFluid {...args} />
        <Div width="10%">
            <TextField isFluid {...args} />
        </Div>
    </Stack>
);

export const States: Story = {
    play: async ({ canvasElement }) => {
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
                    input.setAttribute("data-hovered", "true");
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
