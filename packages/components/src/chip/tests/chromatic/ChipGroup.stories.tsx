import { Div, type Selection } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { Badge } from "../../../badge/index.ts";
import { ContextualHelp } from "../../../contextual-help/index.ts";
import { IconList } from "../../../icon-list/index.ts";
import { Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Chip, ChipGroup, type ChipGroupProps } from "../../src/index.ts";

const meta = {
    title: "Components/ChipGroup",
    component: ChipGroup
} satisfies Meta<typeof ChipGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => {
        return (
            <Stack>
                <ChipGroup {...props} size="sm" label="Small">
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3" style={{ maxWidth: "5rem" }}>Chip 3 with long text</Chip>
                </ChipGroup>

                <ChipGroup {...props} label="Medium">
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3" style={{ maxWidth: "5rem" }}>Chip 3 with long text</Chip>
                </ChipGroup>

                <ChipGroup {...props} size="lg" label="Large">
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3" style={{ maxWidth: "6rem" }}>Chip 3 with long text</Chip>
                </ChipGroup>
            </Stack>
        );
    }
} satisfies Story;

export const WithContextualHelp = {
    render: props => {
        return (
            <ChipGroup {...props}>
                <Chip id="1">Chip 1</Chip>
                <Chip id="2">Chip 2</Chip>
                <Chip id="3">Chip 3</Chip>
            </ChipGroup>
        );
    },
    decorators: [
        Story => (
            <Div UNSAFE_height="100px">
                <Story />
            </Div>
        )
    ],
    args: {
        label: "Small",
        contextualHelp: <ContextualHelp isOpen>Contextual help text for the chip group.</ContextualHelp>
    }
} satisfies Story;

export const Icons = {
    render: props => {
        return (
            <Stack>
                <ChipGroup {...props} size="sm" label="Small">
                    <Chip id="1" textValue="Chip 1">
                        <SparklesIcon />
                        <Text>Chip 1</Text>
                    </Chip>
                    <Chip id="2" textValue="Chip 2">
                        <Text>Chip 2</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Chip>
                </ChipGroup>
                <ChipGroup {...props} label="Medium">
                    <Chip id="1" textValue="Chip 1">
                        <SparklesIcon />
                        <Text>Chip 1</Text>
                    </Chip>
                    <Chip id="2" textValue="Chip 2">
                        <Text>Chip 2</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Chip>
                </ChipGroup>
                <ChipGroup {...props} size="lg" label="Large">
                    <Chip id="1" textValue="Chip 1">
                        <SparklesIcon />
                        <Text>Chip 1</Text>
                    </Chip>
                    <Chip id="2" textValue="Chip 2">
                        <Text>Chip 2</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Chip>
                </ChipGroup>
            </Stack>
        );
    }
} satisfies Story;

export const Count = {
    render: props => {
        return (
            <Stack>
                <ChipGroup {...props} size="sm" label="Small">
                    <Chip id="1" textValue="Chip 1"><Text>Chip 1</Text><Badge variant="subdued">100</Badge></Chip>
                    <Chip id="2" textValue="Chip 2"><Text>Chip 2</Text><Badge variant="subdued">99+</Badge></Chip>
                </ChipGroup>
                <ChipGroup {...props} label="Medium">
                    <Chip id="1" textValue="Chip 1"><Text>Chip 1</Text><Badge variant="subdued">100</Badge></Chip>
                    <Chip id="2" textValue="Chip 2"><Text>Chip 2</Text><Badge variant="subdued">99+</Badge></Chip>
                </ChipGroup>
                <ChipGroup {...props} size="lg" label="Large">
                    <Chip id="1" textValue="Chip 1"><Text>Chip 1</Text><Badge variant="subdued">100</Badge></Chip>
                    <Chip id="2" textValue="Chip 2"><Text>Chip 2</Text><Badge variant="subdued">99+</Badge></Chip>
                </ChipGroup>
            </Stack>
        );
    }
} satisfies Story;

export const Disabled = {
    render: props => {
        return (
            <Stack>
                <ChipGroup {...props} size="sm" label="Small" disabledKeys={["1", "2", "3"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
                <ChipGroup {...props} label="Medium" disabledKeys={["1", "2", "3"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
                <ChipGroup {...props} size="lg" label="Large" disabledKeys={["1", "2", "3"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
            </Stack>
        );
    }
} satisfies Story;

export const Invalid = {
    render: props => {
        return (
            <Stack>
                <ChipGroup {...props} size="sm" label="Small" isInvalid>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                </ChipGroup>
                <ChipGroup {...props} label="Medium" isInvalid>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                </ChipGroup>
                <ChipGroup {...props} size="lg" label="Large" isInvalid>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                </ChipGroup>
            </Stack>
        );
    }
} satisfies Story;

export const Removable = {
    render: props => {
        return (
            <ChipGroup {...props} label="Removable">
                <Chip id="1">Chip 1</Chip>
                <Chip id="2">Chip 2</Chip>
                <Chip id="3">Chip 3</Chip>
            </ChipGroup>
        );
    },
    args: {
        onRemove: () => {}
    }
} satisfies Story;

export const SingleSelection = {
    render: props => {
        return (
            <Stack>
                <ChipGroup {...props} size="sm" label="Small" selectionMode="single" defaultSelectedKeys={["1"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
                <ChipGroup {...props} label="Medium" selectionMode="single" defaultSelectedKeys={["1"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
                <ChipGroup {...props} size="lg" label="Large" selectionMode="single" defaultSelectedKeys={["1"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
            </Stack>
        );
    }
} satisfies Story;

export const MultipleSelection = {
    render: props => {
        return (
            <Stack>
                <ChipGroup {...props} size="sm" label="Small" defaultSelectedKeys={["1", "3"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
                <ChipGroup {...props} label="Medium" defaultSelectedKeys={["1", "3"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
                <ChipGroup {...props} size="lg" label="Large" defaultSelectedKeys={["1", "3"]}>
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
            </Stack>
        );
    }
} satisfies Story;

const StateTemplate = (args: ChipGroupProps<unknown>) => (
    <Stack>
        <ChipGroup {...args} data-testid="chip-group" size="sm" label="Small">
            <Chip id="1" textValue="Chip 1">
                <SparklesIcon />
                <Text>Chip 1</Text>
            </Chip>
            <Chip id="2" textValue="Chip 2">
                <Text>Chip 2</Text>
                <Badge variant="subdued">99+</Badge>
            </Chip>
            <Chip id="3">Chip 3</Chip>
        </ChipGroup>
        <ChipGroup {...args} data-testid="chip-group" label="Medium">
            <Chip id="1" textValue="Chip 1">
                <SparklesIcon />
                <Text>Chip 1</Text>
            </Chip>
            <Chip id="2" textValue="Chip 2">
                <Text>Chip 2</Text>
                <Badge variant="subdued">99+</Badge>
            </Chip>
            <Chip id="3">Chip 3</Chip>
        </ChipGroup>
        <ChipGroup {...args} data-testid="chip-group" size="lg" label="Large">
            <Chip id="1" textValue="Chip 1">
                <SparklesIcon />
                <Text>Chip 1</Text>
            </Chip>
            <Chip id="2" textValue="Chip 2">
                <Text>Chip 2</Text>
                <Badge variant="subdued">99+</Badge>
            </Chip>
            <Chip id="3">Chip 3</Chip>
        </ChipGroup>
    </Stack>
);

export const DefaultStates: Story = {
    play: ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const chipGroups = canvas.getAllByTestId("chip-group");
        chipGroups.forEach(chipGroup => {
            const chips = chipGroup.querySelectorAll(".hop-Chip");
            chips.forEach(chip => {
                if (!chip.getAttribute("data-disabled")) {
                    if (chipGroup.getAttribute("data-chromatic-force-focus")) {
                        chip.setAttribute("data-focus-visible", "true");
                    }

                    if (chipGroup.getAttribute("data-chromatic-force-hover")) {
                        chip.setAttribute("data-hovered", "true");
                    }

                    if (chipGroup.getAttribute("data-chromatic-force-press")) {
                        chip.setAttribute("data-pressed", "true");
                    }
                }
            });

            chipGroup.removeAttribute("data-chromatic-force-focus");
            chipGroup.removeAttribute("data-chromatic-force-hover");
            chipGroup.removeAttribute("data-chromatic-force-press");
        });
    },
    render: args => {
        return (
            <Stack>
                <h1>Default</h1>
                <StateTemplate {...args} />
                <h1>Disabled</h1>
                <StateTemplate {...args} disabledKeys={["1", "2", "3"]} />
                <h1>Pressed</h1>
                <StateTemplate {...args} data-chromatic-force-press />
                <h1>Focus Visible</h1>
                <StateTemplate {...args} data-chromatic-force-focus />
                <h1>Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-hover />
                <h1>Focus Visible and Hovered</h1>
                <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover />
                <h1>Selected</h1>
                <StateTemplate {...args} defaultSelectedKeys="all" />
                <h1>Invalid</h1>
                <StateTemplate {...args} isInvalid />
            </Stack>
        );
    },
    args: {
        onRemove: (ids: Selection) => {
            alert(`Remove: ${[...ids]}`);
        }
    }
} satisfies Story;
