import { SparklesIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";
import { ButtonContext } from "react-aria-components";

import { IconList } from "../../../icon-list/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Button, type ButtonProps } from "../../src/Button.tsx";

const meta = {
    title: "Components/Buttons/Button",
    component: Button,
    args: {
        children: "Click me!"
    },
    parameters: {
        chromatic: {
            delay: 2000
        }
    }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Stack>
                <Stack>
                    <h1>Default</h1>
                    <Inline alignY="end">
                        <Button size="sm" {...args}>Save</Button>
                        <Button {...args}>Save</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button isLoading size="sm" {...args}>Save</Button>
                        <Button isLoading {...args}>Save</Button>
                    </Inline>
                    <Div>
                        <Button isFluid {...args}>Save</Button>
                    </Div>
                    <Div width="10%">
                        <Button isFluid {...args}>Save</Button>
                    </Div>
                    <Div>
                        <Button isLoading isFluid {...args}>Save</Button>
                    </Div>
                </Stack>
                <Stack>
                    <h1>Icons</h1>
                    <Inline alignY="end">
                        <Button size="sm" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </Button>
                        <Button {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button size="sm" {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </Button>
                        <Button {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button isLoading size="sm" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </Button>
                        <Button isLoading {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </Button>
                    </Inline>
                    <Div>
                        <Button isDisabled {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </Button>
                    </Div>
                    <Stack>
                        <Button isFluid {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </Button>
                        <Button isFluid {...args}>
                            <Text>Save</Text>
                        </Button>
                    </Stack>
                </Stack>
                <Stack>
                    <h1>End icons</h1>
                    <Inline alignY="end">
                        <Button size="sm" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </Button>
                        <Button {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button size="sm" {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </Button>
                        <Button {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button isLoading size="sm" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </Button>
                        <Button isLoading {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </Button>
                    </Inline>
                    <Div>
                        <Button isDisabled {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </Button>
                    </Div>
                    <Stack>
                        <Button isFluid {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </Button>
                        <Button isFluid {...args}>
                            <Text>Save</Text>
                        </Button>
                    </Stack>
                </Stack>
                <Stack>
                    <h1>Zoom</h1>
                    <Inline alignY="end">
                        <Div className="zoom-in">
                            <Button {...args}>Save</Button>
                        </Div>
                        <Div className="zoom-out">
                            <Button {...args}>Save</Button>
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

const StateTemplate = (args: Partial<ButtonProps>) => (
    <Inline alignY="end">
        <Button size="sm" {...args}>Save</Button>
        <Button {...args}>Save</Button>
        <Button isLoading size="sm" {...args}>Save</Button>
        <Button isLoading {...args}>Save</Button>
        <Button {...args}>
            <SparklesIcon />
            <Text>Save</Text>
        </Button>
        <Button {...args}>
            <Text>Save</Text>
            <SparklesIcon slot="end-icon" />
        </Button>
        <Button {...args}>
            <Text>Save</Text>
            <IconList>
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
        </Button>
        <Button {...args}>
            <Text>Save</Text>
            <IconList slot="end-icon">
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
        </Button>
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
                <h1>Pressed</h1>
                <ButtonContext.Provider value={{ isPressed: true }}>
                    <StateTemplate {...args} />
                </ButtonContext.Provider>
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
