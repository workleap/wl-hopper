import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { Badge } from "../../../badge/index.ts";
import { Card } from "../../../card/index.ts";
import { Stack } from "../../../layout/index.ts";
import { Tag } from "../../../tag/index.ts";
import { Text } from "../../../typography/index.ts";
import { TabPanel } from "../../src/index.ts";
import { Tab } from "../../src/Tab.tsx";
import { TabList } from "../../src/TabList.tsx";
import { Tabs } from "../../src/Tabs.tsx";

const meta = {
    title: "Components/Tabs",
    component: Tabs
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    ),
    args: {
        "aria-label": "Frogs"
    }
} satisfies Story;

export const Disabled = {
    ...Default,
    args: {
        ...Default.args,
        isDisabled: true
    }
} satisfies Story;

export const DisabledItem = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab isDisabled id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    ),
    args: {
        "aria-label": "Frogs"
    }
} satisfies Story;

export const DisabledKeys = {
    ...Default,
    args: {
        ...Default.args,
        disabledKeys: ["poison-dart"]
    }
};

export const Fluid = {
    ...Default,
    args: {
        ...Default.args,
        isFluid: true
    }
} satisfies Story;

export const InCard = {
    ...Default,
    decorators: [
        Story => (
            <Card>
                <Story />
            </Card>
        )
    ],
    args: {
        ...Default.args,
        variant: "in-card"
    }
} satisfies Story;

export const Heading = {
    ...Default,
    args: {
        ...Default.args,
        variant: "heading"
    }
} satisfies Story;

export const Medium = {
    ...Default,
    args: {
        ...Default.args,
        size: "md"
    }
} satisfies Story;

export const MediumInCard = {
    ...InCard,
    args: {
        ...InCard.args,
        size: "md"
    }
} satisfies Story;

export const MediumHeading = {
    ...Heading,
    args: {
        ...Heading.args,
        size: "md"
    }
} satisfies Story;

export const Mobile = {
    ...Default,
    decorators: [
        Story => (
            <div style={{ maxWidth: "360px" }}>
                <Story />
            </div>
        )
    ]
} satisfies Story;

export const WithIcon = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <SparklesIcon />
                    <Text>Red Eye Frog</Text>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args
    }
} satisfies Story;

export const WithBadge = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <Text>Red Eye Frog</Text>
                    <Badge>100</Badge>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args
    }
} satisfies Story;

export const WithTag = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <Text>Red Eye Frog</Text>
                    <Tag>New</Tag>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args
    }
} satisfies Story;

export const WithAll = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <SparklesIcon />
                    <Text>Red Eye Frog</Text>
                    <Badge>100</Badge>
                    <Tag>New</Tag>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args
    }
} satisfies Story;

export const WithMediumIcon = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <SparklesIcon />
                    <Text>Red Eye Frog</Text>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args,
        size: "md"
    }
} satisfies Story;

export const WithMediumBadge = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <Text>Red Eye Frog</Text>
                    <Badge>100</Badge>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args,
        size: "md"
    }
} satisfies Story;

export const WithMediumTag = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <Text>Red Eye Frog</Text>
                    <Tag>New</Tag>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args,
        size: "md"
    }
} satisfies Story;

export const WithMediumAll = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree">
                    <SparklesIcon />
                    <Text>Red Eye Frog</Text>
                    <Badge>100</Badge>
                    <Tag>New</Tag>
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args,
        size: "md"
    }
} satisfies Story;

export const WithHref = {
    render: args => (
        <Tabs {...args} >
            <TabList>
                <Tab id="red-eye-tree" href="https://www.google.com">
                    Google
                </Tab>
            </TabList>
        </Tabs>
    ),
    args: {
        ...Default.args,
        size: "md"
    }
} satisfies Story;

export const States: Story = {
    parameters: {
        chromatic: {
            delay: 2000
        }
    },
    play: ({ canvasElement }) => {
        const canvas = within(canvasElement);

        canvas.getAllByRole("tab").forEach(tab => {
            if (tab.getAttribute("data-chromatic-force-focus")) {
                tab.setAttribute("data-focus-visible", "true");
                tab.removeAttribute("data-chromatic-force-focus");
            }

            if (tab.getAttribute("data-chromatic-force-hover")) {
                tab.setAttribute("data-hovered", "true");
                tab.removeAttribute("data-chromatic-force-hover");
            }
        });

        canvas.getAllByRole("tabpanel").forEach(panel => {
            if (panel.getAttribute("data-chromatic-force-focus")) {
                panel.setAttribute("data-focus-visible", "true");
                panel.removeAttribute("data-chromatic-force-focus");
            }
        });
    },
    render: args => (
        <Stack>
            <h1>Tab Hovered</h1>
            <Tabs {...args}>
                <TabList>
                    <Tab id="t1-frog-1" data-chromatic-force-hover>Red-Eyed Tree Frog</Tab>
                    <Tab id="t1-frog-2" data-chromatic-force-hover>
                        <SparklesIcon />
                        <Text>Poison Dart Frog</Text>
                    </Tab>
                    <Tab id="t1-frog-3" data-chromatic-force-hover>
                        <Text>Goliath Frog</Text>
                        <Badge>3</Badge>
                    </Tab>
                </TabList>
                <TabPanel id="t1-frog-1" padding="inset-md">The Red-Eyed Tree Frog is a vibrant nocturnal climber.</TabPanel>
                <TabPanel id="t1-frog-2" padding="inset-md">The Poison Dart Frog is a tiny but highly toxic amphibian.</TabPanel>
                <TabPanel id="t1-frog-3" padding="inset-md">The Goliath Frog is the largest frog in the world.</TabPanel>
            </Tabs>
            <h1>Tab Focus Visible</h1>
            <Tabs {...args}>
                <TabList>
                    <Tab id="t2-frog-1" data-chromatic-force-focus>Red-Eyed Tree Frog</Tab>
                    <Tab id="t2-frog-2" data-chromatic-force-focus>
                        <SparklesIcon />
                        <Text>Poison Dart Frog</Text>
                    </Tab>
                    <Tab id="t2-frog-3" data-chromatic-force-focus>
                        <Text>Goliath Frog</Text>
                        <Badge>3</Badge>
                    </Tab>
                </TabList>
                <TabPanel id="t2-frog-1" padding="inset-md">The Red-Eyed Tree Frog is a vibrant nocturnal climber.</TabPanel>
                <TabPanel id="t2-frog-2" padding="inset-md">The Poison Dart Frog is a tiny but highly toxic amphibian.</TabPanel>
                <TabPanel id="t2-frog-3" padding="inset-md">The Goliath Frog is the largest frog in the world.</TabPanel>
            </Tabs>
            <h1>Tab Focus Visible and Hovered</h1>
            <Tabs {...args}>
                <TabList>
                    <Tab id="t3-frog-1" data-chromatic-force-focus data-chromatic-force-hover>Red-Eyed Tree Frog</Tab>
                    <Tab id="t3-frog-2" data-chromatic-force-focus data-chromatic-force-hover>
                        <SparklesIcon />
                        <Text>Poison Dart Frog</Text>
                    </Tab>
                    <Tab id="t3-frog-3" data-chromatic-force-focus data-chromatic-force-hover>
                        <Text>Goliath Frog</Text>
                        <Badge>3</Badge>
                    </Tab>
                </TabList>
                <TabPanel id="t3-frog-1" padding="inset-md">The Red-Eyed Tree Frog is a vibrant nocturnal climber.</TabPanel>
                <TabPanel id="t3-frog-2" padding="inset-md">The Poison Dart Frog is a tiny but highly toxic amphibian.</TabPanel>
                <TabPanel id="t3-frog-3" padding="inset-md">The Goliath Frog is the largest frog in the world.</TabPanel>
            </Tabs>
            <h1>Tab Disabled</h1>
            <Tabs {...args}>
                <TabList>
                    <Tab id="t4-frog-1" isDisabled>Red-Eyed Tree Frog</Tab>
                    <Tab id="t4-frog-2" isDisabled>
                        <SparklesIcon />
                        <Text>Poison Dart Frog</Text>
                    </Tab>
                    <Tab id="t4-frog-3" isDisabled>
                        <Text>Goliath Frog</Text>
                        <Badge>3</Badge>
                    </Tab>
                </TabList>
                <TabPanel id="t4-frog-1" padding="inset-md">The Red-Eyed Tree Frog is a vibrant nocturnal climber.</TabPanel>
                <TabPanel id="t4-frog-2" padding="inset-md">The Poison Dart Frog is a tiny but highly toxic amphibian.</TabPanel>
                <TabPanel id="t4-frog-3" padding="inset-md">The Goliath Frog is the largest frog in the world.</TabPanel>
            </Tabs>
            <h1>Tab Panel Focus Visible</h1>
            <Tabs {...args}>
                <TabList>
                    <Tab id="t5-frog-1">Red-Eyed Tree Frog</Tab>
                    <Tab id="t5-frog-2">Poison Dart Frog</Tab>
                    <Tab id="t5-frog-3">Goliath Frog</Tab>
                </TabList>
                <TabPanel id="t5-frog-1" padding="inset-md" data-chromatic-force-focus>The Red-Eyed Tree Frog is a vibrant nocturnal climber.</TabPanel>
                <TabPanel id="t5-frog-2" padding="inset-md">The Poison Dart Frog is a tiny but highly toxic amphibian.</TabPanel>
                <TabPanel id="t5-frog-3" padding="inset-md">The Goliath Frog is the largest frog in the world.</TabPanel>
            </Tabs>
        </Stack>
    ),
    args: {
        "aria-label": "Frogs"
    }
};
