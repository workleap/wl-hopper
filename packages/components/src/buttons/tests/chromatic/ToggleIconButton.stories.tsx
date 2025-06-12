import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";
import { ToggleButtonContext } from "react-aria-components";

import { Inline, Stack } from "../../../layout/index.ts";
import { ToggleButton, type ToggleButtonProps } from "../../src/ToggleButton.tsx";

const meta = {
    title: "Components/Buttons/ToggleButton/Icon Only",
    component: ToggleButton,
    args: {
        children: <SparklesIcon />,
        "aria-label": "Clean"
    },
    parameters: {
        chromatic: {
            delay: 2000
        }
    }
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => (
        <Stack>
            <Inline alignY="end">
                <ToggleButton size="xs" {...args} />
                <ToggleButton size="sm" {...args} />
                <ToggleButton {...args} />
            </Inline>
            <Inline alignY="end">
                <ToggleButton isLoading size="xs" {...args} />
                <ToggleButton isLoading size="sm" {...args} />
                <ToggleButton isLoading {...args} />
            </Inline>
            <ToggleButton size="xs" isFluid {...args} />
            <ToggleButton size="sm" isFluid {...args} />
            <ToggleButton isFluid {...args} />
        </Stack>
    )
};

export const Secondary: Story = {
    ...Primary,
    args:{
        ...Primary.args,
        variant: "secondary"
    }
};

export const Upsell: Story = {
    ...Primary,
    args:{
        ...Primary.args,
        variant: "upsell"
    }
};

export const Danger: Story = {
    ...Primary,
    args:{
        ...Primary.args,
        variant: "danger"
    }
};

export const GhostPrimary: Story = {
    ...Primary,
    args:{
        ...Primary.args,
        variant: "ghost-primary"
    }
};

export const GhostSecondary: Story = {
    ...Primary,
    args:{
        ...Primary.args,
        variant: "ghost-secondary"
    }
};

export const GhostDanger: Story = {
    ...Primary,
    args:{
        ...Primary.args,
        variant: "ghost-danger"
    }
};

const StateTemplate = (args: Partial<ToggleButtonProps>) => (
    <Inline alignY="end">
        <ToggleButton size="xs" {...args} />
        <ToggleButton size="sm" {...args} />
        <ToggleButton {...args} />
        <ToggleButton isLoading size="xs" {...args} />
        <ToggleButton isLoading size="sm" {...args} />
        <ToggleButton isLoading {...args} />
    </Inline>
);

export const PrimaryStates: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const buttons = canvas.getAllByRole("button");

        buttons.forEach(button => {
            if (button.getAttribute("disabled") !== "") { // don't try and force states on a disabled input
                if (button.getAttribute("data-chromatic-force-focus")) {
                    button.setAttribute("data-focus-visible", "true");
                    button.removeAttribute("data-chromatic-force-focus");
                }

                if (button.getAttribute("data-chromatic-force-hover")) {
                    button.setAttribute("data-hovered", "true");
                    button.removeAttribute("data-chromatic-force-hover");
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
                <h1>Selected</h1>
                <ToggleButtonContext.Provider value={{ isSelected: true }}>
                    <StateTemplate {...args} />
                </ToggleButtonContext.Provider>
                <h1>Focus Visible</h1>
                <StateTemplate {...args} data-chromatic-force-focus />
                <h1>Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-hover />
                <h1>Focus Visible and Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover />
            </Stack>
        );
    }
};

export const SecondaryStates: Story = {
    ...PrimaryStates,
    args: {
        variant: "secondary"
    }
};

export const UpsellStates: Story = {
    ...PrimaryStates,
    args: {
        variant: "upsell"
    }
};

export const DangerStates: Story = {
    ...PrimaryStates,
    args: {
        variant: "danger"
    }
};

export const GhostPrimaryStates: Story = {
    ...PrimaryStates,
    args: {
        variant: "ghost-primary"
    }
};

export const GhostSecondaryStates: Story = {
    ...PrimaryStates,
    args: {
        variant: "ghost-secondary"
    }
};

export const GhostDangerStates: Story = {
    ...PrimaryStates,
    args: {
        variant: "ghost-danger"
    }
};
