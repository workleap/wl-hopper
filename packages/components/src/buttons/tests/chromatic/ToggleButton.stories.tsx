import { SparklesIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";
import { ToggleButtonContext } from "react-aria-components";

import { IconList } from "../../../icon-list/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { ToggleButton, type ToggleButtonProps } from "../../src/ToggleButton.tsx";

const meta = {
    title: "Components/Buttons/ToggleButton",
    component: ToggleButton,
    args: {
        children: "Click me!"
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
    render: args => {
        return (
            <Stack>
                <Stack>
                    <h1>Default</h1>
                    <Inline alignY="end">
                        <ToggleButton size="xs" {...args}>Save</ToggleButton>
                        <ToggleButton size="sm" {...args}>Save</ToggleButton>
                        <ToggleButton {...args}>Save</ToggleButton>
                    </Inline>
                    <Inline alignY="end">
                        <ToggleButton isLoading size="xs" {...args}>Save</ToggleButton>
                        <ToggleButton isLoading size="sm" {...args}>Save</ToggleButton>
                        <ToggleButton isLoading {...args}>Save</ToggleButton>
                    </Inline>
                    <Div>
                        <ToggleButton isFluid {...args}>Save</ToggleButton>
                    </Div>
                    <Div width="10%">
                        <ToggleButton isFluid {...args}>Save</ToggleButton>
                    </Div>
                    <Div>
                        <ToggleButton isLoading isFluid {...args}>Save</ToggleButton>
                    </Div>
                </Stack>
                <Stack>
                    <h1>Icons</h1>
                    <Inline alignY="end">
                        <ToggleButton size="xs" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                        <ToggleButton size="sm" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                        <ToggleButton {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                    </Inline>
                    <Inline alignY="end">
                        <ToggleButton size="xs" {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </ToggleButton>
                        <ToggleButton size="sm" {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </ToggleButton>
                        <ToggleButton {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </ToggleButton>
                    </Inline>
                    <Inline alignY="end">
                        <ToggleButton isLoading size="xs" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                        <ToggleButton isLoading size="sm" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                        <ToggleButton isLoading {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                    </Inline>
                    <Div>
                        <ToggleButton isDisabled {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                    </Div>
                    <Stack>
                        <ToggleButton isFluid {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </ToggleButton>
                        <ToggleButton isFluid {...args}>
                            <Text>Save</Text>
                        </ToggleButton>
                    </Stack>
                </Stack>
                <Stack>
                    <h1>End icons</h1>
                    <Inline alignY="end">
                        <ToggleButton size="xs" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                        <ToggleButton size="sm" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                        <ToggleButton {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                    </Inline>
                    <Inline alignY="end">
                        <ToggleButton size="xs" {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </ToggleButton>
                        <ToggleButton size="sm" {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </ToggleButton>
                        <ToggleButton {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </ToggleButton>
                    </Inline>
                    <Inline alignY="end">
                        <ToggleButton isLoading size="xs" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                        <ToggleButton isLoading size="sm" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                        <ToggleButton isLoading {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                    </Inline>
                    <Div>
                        <ToggleButton isDisabled {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                    </Div>
                    <Stack>
                        <ToggleButton isFluid {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </ToggleButton>
                        <ToggleButton isFluid {...args}>
                            <Text>Save</Text>
                        </ToggleButton>
                    </Stack>
                </Stack>
                <Stack>
                    <h1>Zoom</h1>
                    <Inline alignY="end">
                        <Div className="zoom-in">
                            <ToggleButton {...args}>Save</ToggleButton>
                        </Div>
                        <Div className="zoom-out">
                            <ToggleButton {...args}>Save</ToggleButton>
                        </Div>
                    </Inline>
                </Stack>
            </Stack>
        );
    }
};
export const Secondary: Story = {
    ...Primary,
    args: {
        variant: "secondary"
    }
};

export const Upsell: Story = {
    ...Primary,
    args: {
        variant: "upsell"
    }
};

export const Danger: Story = {
    ...Primary,
    args: {
        variant: "danger"
    }
};

export const GhostPrimary: Story = {
    ...Primary,
    args: {
        variant: "ghost-primary"
    }
};

export const GhostSecondary: Story = {
    ...Primary,
    args: {
        variant: "ghost-secondary"
    }
};

export const GhostDanger: Story = {
    ...Primary,
    args: {
        variant: "ghost-danger"
    }
};


const StateTemplate = (args: Partial<ToggleButtonProps>) => (
    <Inline alignY="end">
        <ToggleButton size="xs" {...args}>Save</ToggleButton>
        <ToggleButton size="sm" {...args}>Save</ToggleButton>
        <ToggleButton {...args}>Save</ToggleButton>
        <ToggleButton isLoading size="xs" {...args}>Save</ToggleButton>
        <ToggleButton isLoading size="sm" {...args}>Save</ToggleButton>
        <ToggleButton isLoading {...args}>Save</ToggleButton>
        <ToggleButton {...args}>
            <SparklesIcon />
            <Text>Save</Text>
        </ToggleButton>
        <ToggleButton {...args}>
            <Text>Save</Text>
            <SparklesIcon slot="end-icon" />
        </ToggleButton>
        <ToggleButton {...args}>
            <Text>Save</Text>
            <IconList>
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
        </ToggleButton>
        <ToggleButton {...args}>
            <Text>Save</Text>
            <IconList slot="end-icon">
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
        </ToggleButton>
    </Inline>
);

export const PrimaryStates: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const toggleButtons = canvas.getAllByRole("button");

        toggleButtons.forEach(toggleButton => {
            if (toggleButton.getAttribute("disabled") !== "") { // don't try and force states on a disabled input
                if (toggleButton.getAttribute("data-chromatic-force-focus")) {
                    toggleButton.setAttribute("data-focus-visible", "true");
                    toggleButton.removeAttribute("data-chromatic-force-focus");
                }

                if (toggleButton.getAttribute("data-chromatic-force-hover")) {
                    toggleButton.setAttribute("data-hovered", "true");
                    toggleButton.removeAttribute("data-chromatic-force-hover");
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

