import { Div, IconList } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { Inline, Stack } from "../../../index.ts";
import { Text } from "../../../typography/index.ts";
import { Link, type LinkProps } from "../../src/Link.tsx";

const meta = {
    title: "Components/Link",
    component: Link
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => {
        return (
            <Stack>
                <Inline alignY="end">
                    <Link size="sm" {...args} >Learn more</Link>
                    <Link {...args} >Learn more</Link>
                </Inline>
                <Div fontSize="core_180">
                    <Link size="inherit" {...args}>Learn more</Link>
                </Div>
                <Div UNSAFE_width="400px">
                    <Link {...args}>
                        Frogs have excellent night vision and are very sensitive to movement.
                        The bulging eyes of most frogs allow them to see in front, to the sides, and partially behind
                        them. When a frog swallows food, it pulls its eyes down into the roof of its mouth, to help push
                        the food down its throat.
                    </Link>
                </Div>
                <Stack>
                    <Link size="xs" {...args}>Learn more</Link>
                    <Link size="sm" {...args}>Learn more</Link>
                    <Link size="md" {...args}>Learn more</Link>
                    <Link size="lg" {...args}>Learn more</Link>
                    <Link size="xl" {...args}>Learn more</Link>
                    <Link size="2xl" {...args}>Learn more</Link>
                </Stack>
            </Stack>
        );
    },
    args: {
        href: "#"
    }
};

export const StartIcon: Story = {
    render: args => {
        return (
            <Stack>
                <Inline alignY="end">
                    <Link size="sm" {...args} >
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                    <Link {...args} >
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                </Inline>
                <Div fontSize="core_180">
                    <Link size="inherit" {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                </Div>
                <Div UNSAFE_width="400px">
                    <Link {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>
                            Frogs have excellent night vision and are very sensitive to movement.
                            The bulging eyes of most frogs allow them to see in front, to the sides, and partially
                            behind them. When a frog swallows food, it pulls its eyes down into the roof of its mouth,
                            to help push the food down its throat.
                        </Text>
                    </Link>
                </Div>
                <Stack>
                    <Link size="xs" {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                    <Link size="sm" {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                    <Link size="md" {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                    <Link size="lg" {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                    <Link size="xl" {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                    <Link size="2xl" {...args}>
                        <SparklesIcon slot="start-icon" />
                        <Text>Learn more</Text>
                    </Link>
                </Stack>
            </Stack>
        );
    },
    args: {
        href: "#"
    }
};

export const EndIcon: Story = {
    render: args => {
        return (
            <Stack>
                <Inline alignY="end">
                    <Link size="sm" {...args} >
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                    <Link {...args} >
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                </Inline>
                <Div fontSize="core_180">
                    <Link size="inherit" {...args}>
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                </Div>
                <Div UNSAFE_width="400px">
                    <Link {...args}>
                        <Text>
                            Frogs have excellent night vision and are very sensitive to movement.
                            The bulging eyes of most frogs allow them to see in front, to the sides, and partially
                            behind them. When a frog swallows food, it pulls its eyes down into the roof of its mouth,
                            to help push the food down its throat.
                        </Text>
                        <SparklesIcon />
                    </Link>
                </Div>
                <Stack>
                    <Link size="xs" {...args}>
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                    <Link size="sm" {...args}>
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                    <Link size="md" {...args}>
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                    <Link size="lg" {...args}>
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                    <Link size="xl" {...args}>
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                    <Link size="2xl" {...args}>
                        <Text>Learn more</Text>
                        <SparklesIcon />
                    </Link>
                </Stack>
            </Stack>
        );
    },
    args: {
        href: "#"
    }
};

export const Primary: Story = {
    render: args => (
        <Inline alignY="end">
            <Link {...args} size="xs" />
            <Link {...args} size="sm" />
            <Link {...args} size="md" />
            <Link {...args} size="lg" />
            <Link {...args} size="xl" />
            <Link {...args} size="2xl" />
        </Inline>
    ),
    args: {
        variant: "primary",
        href: "#",
        children: "Learn more"
    }
};

export const QuietPrimary: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        isQuiet: true
    }
};

export const StandalonePrimary: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        isStandalone: true
    }
};

export const QuietStandalonePrimary: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        isQuiet: true,
        isStandalone: true
    }
};

export const Secondary: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        variant: "secondary"
    }
};

export const QuietSecondary: Story = {
    ...Secondary,
    args: {
        ...Secondary.args,
        isQuiet: true
    }
};

export const QuietStandaloneSecondary: Story = {
    ...Secondary,
    args: {
        ...Secondary.args,
        isQuiet: true,
        isStandalone: true
    }
};

export const StandaloneSecondary: Story = {
    ...Secondary,
    args: {
        ...Secondary.args,
        isStandalone: true
    }
};

export const OverwriteFontWeight: Story = {
    ...Secondary,
    args: {
        ...Secondary.args,
        fontWeight: "core_505"
    }
};
export const StaticColor: Story = {
    ...Primary,
    decorators: [
        Story => (
            <Stack
                backgroundColor="decorative-option4"
                color="decorative-option4"
                padding="inset-md"
            ><Story />
            </Stack>
        )
    ],
    args: {
        ...Primary.args,
        color: "inherit"
    }
};

const StateTemplate = (args: Partial<LinkProps>) => (
    <Inline alignY="end">
        <Link {...args}>Save</Link>
        <Link {...args}>
            <Text>Save</Text>
            <SparklesIcon />
        </Link>
        <Link {...args}>
            <SparklesIcon slot="start-icon" />
            <Text>Save</Text>
        </Link>
        <Link {...args}>
            <Text>Save</Text>
            <IconList>
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
        </Link>
        <Link {...args}>
            <IconList slot="start-icon">
                <SparklesIcon /><SparklesIcon /><SparklesIcon />
            </IconList>
            <Text>Save</Text>
        </Link>
    </Inline>
);

export const PrimaryStates: Story = {
    play: ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const links = canvas.getAllByRole("link");

        links.forEach(link => {
            if (link.getAttribute("aria-disabled") !== "") { // don't try and force states on a disabled input
                if (link.getAttribute("data-chromatic-force-focus")) {
                    link.setAttribute("data-focus-visible", "true");
                    link.removeAttribute("data-chromatic-force-focus");
                }

                if (link.getAttribute("data-chromatic-force-hover")) {
                    link.setAttribute("data-hovered", "true");
                    link.removeAttribute("data-chromatic-force-hover");
                }

                if (link.getAttribute("data-chromatic-force-press")) {
                    link.setAttribute("data-pressed", "true");
                    link.removeAttribute("data-chromatic-force-press");
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
                <h1>Focus Visible</h1>
                <StateTemplate {...args} data-chromatic-force-focus />
                <h1>Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-hover />
                <h1>Pressed</h1>
                <StateTemplate {...args} data-chromatic-force-press />
                <h1>Focus Visible and Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover />
            </Stack>
        );
    },
    args: {
        children: "Learn more",
        href: "#",
        variant: "primary"
    }
};
export const SecondaryStates: Story = {
    ...PrimaryStates,
    args: {
        ...PrimaryStates.args,
        variant: "secondary"
    }
};

