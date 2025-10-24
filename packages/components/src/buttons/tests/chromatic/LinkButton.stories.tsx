import { Div, IconList, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { Inline, Stack } from "../../../layout/index.ts";
import { LinkButton, type LinkButtonProps } from "../../src/LinkButton.tsx";

const meta = {
    title: "Components/Buttons/LinkButton",
    component: LinkButton,
    args: {
        children: "Click me!",
        isExternal: true
    }
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Stack>
                <Stack>
                    <h1>Default</h1>
                    <Inline alignY="end">
                        <LinkButton size="xs" {...args}>Help</LinkButton>
                        <LinkButton size="sm" {...args}>Help</LinkButton>
                        <LinkButton {...args}>Help</LinkButton>
                    </Inline>
                    <Div>
                        <LinkButton isFluid {...args}>Help</LinkButton>
                    </Div>
                    <Div width="10%">
                        <LinkButton isFluid {...args}>Help</LinkButton>
                    </Div>
                </Stack>
                <Stack>
                    <h1>Icons</h1>
                    <Inline alignY="end">
                        <LinkButton size="xs" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </LinkButton>
                        <LinkButton size="sm" {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </LinkButton>
                        <LinkButton {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </LinkButton>
                    </Inline>
                    <Inline alignY="end">
                        <LinkButton size="xs" {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </LinkButton>
                        <LinkButton size="sm" {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </LinkButton>
                        <LinkButton {...args}>
                            <IconList>
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                            <Text>Save</Text>
                        </LinkButton>
                    </Inline>
                    <Div>
                        <LinkButton isDisabled {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </LinkButton>
                    </Div>
                    <Stack>
                        <LinkButton isFluid {...args}>
                            <SparklesIcon />
                            <Text>Save</Text>
                        </LinkButton>
                        <LinkButton isFluid {...args}>
                            <Text>Save</Text>
                        </LinkButton>
                    </Stack>
                </Stack>
                <Stack>
                    <h1>End icons</h1>
                    <Inline alignY="end">
                        <LinkButton size="xs" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </LinkButton>
                        <LinkButton size="sm" {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </LinkButton>
                        <LinkButton {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </LinkButton>
                    </Inline>
                    <Inline alignY="end">
                        <LinkButton size="xs" {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </LinkButton>
                        <LinkButton size="sm" {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </LinkButton>
                        <LinkButton {...args}>
                            <Text>Save</Text>
                            <IconList slot="end-icon">
                                <SparklesIcon /><SparklesIcon /><SparklesIcon />
                            </IconList>
                        </LinkButton>
                    </Inline>
                    <Div>
                        <LinkButton isDisabled {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </LinkButton>
                    </Div>
                    <Stack>
                        <LinkButton isFluid {...args}>
                            <Text>Save</Text>
                            <SparklesIcon slot="end-icon" />
                        </LinkButton>
                        <LinkButton isFluid {...args}>
                            <Text>Save</Text>
                        </LinkButton>
                    </Stack>
                </Stack>
                <Stack>
                    <h1>Zoom</h1>
                    <Inline alignY="end">
                        <Div className="zoom-in">
                            <LinkButton {...args}>Help</LinkButton>
                        </Div>
                        <Div className="zoom-out">
                            <LinkButton {...args}>Help</LinkButton>
                        </Div>
                    </Inline>
                </Stack>
            </Stack>
        );
    },
    args: {
        href: "https://www.google.com"
    }
};

export const Secondary: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        variant: "secondary"
    }
};

export const Upsell: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        variant: "upsell"
    }
};

export const Danger: Story = {
    ...Primary,
    args: {
        ...Primary.args,
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

const StateTemplate = (args: Partial<LinkButtonProps>) => (
    <Inline alignY="end">
        <LinkButton size="xs" {...args}>Help</LinkButton>
        <LinkButton size="sm" {...args}>Help</LinkButton>
        <LinkButton {...args}>Help</LinkButton>
        <LinkButton {...args}>
            <SparklesIcon />
            <Text>Save</Text>
        </LinkButton>
        <LinkButton {...args}>
            <Text>Save</Text>
            <SparklesIcon slot="end-icon" />
        </LinkButton>
        <LinkButton {...args}>
            <Text>Save</Text>
            <IconList>
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
        </LinkButton>
        <LinkButton {...args}>
            <Text>Save</Text>
            <IconList slot="end-icon">
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
        </LinkButton>
    </Inline>
);

export const PrimaryStates: Story = {
    play: ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const buttons = canvas.getAllByRole("link");

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

                if (button.getAttribute("data-chromatic-force-press")) {
                    button.setAttribute("data-pressed", "true");
                    button.removeAttribute("data-chromatic-force-press");
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
                <StateTemplate {...args} data-chromatic-force-press />
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
        href: "https://www.google.com"
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
