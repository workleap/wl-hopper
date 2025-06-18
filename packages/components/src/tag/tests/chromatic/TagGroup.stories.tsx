import { Div, type Selection, type TagVariant } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { Avatar } from "../../../avatar/index.ts";
import { Badge } from "../../../badge/index.ts";
import { ContextualHelp } from "../../../contextual-help/index.ts";
import { IconList } from "../../../icon-list/index.ts";
import { Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Tag, TagGroup, type TagGroupProps } from "../../src/index.ts";

const meta = {
    title: "Components/TagGroup",
    component: TagGroup
} satisfies Meta<typeof TagGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => {
        return (
            <Stack>
                <TagGroup {...props} size="sm" label="Small">
                    <Tag id="1">Tag 1</Tag>
                    <Tag id="2">Tag 2</Tag>
                    <Tag id="3" style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                </TagGroup>

                <TagGroup {...props} label="Medium">
                    <Tag id="1">Tag 1</Tag>
                    <Tag id="2">Tag 2</Tag>
                    <Tag id="3" style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                </TagGroup>

                <TagGroup {...props} size="lg" label="Large">
                    <Tag id="1">Tag 1</Tag>
                    <Tag id="2">Tag 2</Tag>
                    <Tag id="3" style={{ maxWidth: "6rem" }}>Tag 3 with long text</Tag>
                </TagGroup>
            </Stack>
        );
    }
} satisfies Story;

export const WithContextualHelp = {
    render: props => {
        return (
            <TagGroup {...props}>
                <Tag id="1">Tag 1</Tag>
                <Tag id="2">Tag 2</Tag>
                <Tag id="3">Tag 3</Tag>
            </TagGroup>
        );
    },
    decorators: [
        Story => (
            // Important for chromatic
            <Div UNSAFE_height="100px">
                <Story />
            </Div>
        )
    ],
    args: {
        label: "Small",
        contextualHelp: <ContextualHelp isOpen>Contextual help text for the tag group.</ContextualHelp>
    }
} satisfies Story;

const variants: TagVariant[] = ["neutral", "subdued", "progress", "positive", "caution", "negative", "option1", "option2", "option3", "option4", "option5", "option6"];
export const AllVariants = {
    render: props => {
        return (
            <Stack>
                {variants.map(variant => (
                    <TagGroup {...props} size="sm" label={variant} variant={variant} key={variant}>
                        <Tag id="1">Tag 1</Tag>
                        <Tag id="2">Tag 2</Tag>
                        <Tag id="3" style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                    </TagGroup>
                ))}
            </Stack>
        );
    }
} satisfies Story;

export const Href = {
    render: props => {
        return (
            <Stack>
                <TagGroup {...props} size="sm" label="Small">
                    <Tag href="https://www.google.com" id="1">Tag 1</Tag>
                    <Tag href="https://www.google.com" id="2">Tag 2</Tag>
                    <Tag href="https://www.google.com" id="3" style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                </TagGroup>

                <TagGroup {...props} label="Medium">
                    <Tag href="https://www.google.com" id="1">Tag 1</Tag>
                    <Tag href="https://www.google.com" id="2">Tag 2</Tag>
                    <Tag href="https://www.google.com" id="3" style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                </TagGroup>

                <TagGroup {...props} size="lg" label="Large">
                    <Tag href="https://www.google.com" id="1">Tag 1</Tag>
                    <Tag href="https://www.google.com" id="2">Tag 2</Tag>
                    <Tag href="https://www.google.com" id="3" style={{ maxWidth: "6rem" }}>Tag 3 with long text</Tag>
                </TagGroup>
            </Stack>
        );
    }
} satisfies Story;

export const Icons = {
    render: props => {
        return (
            <Stack>
                <TagGroup {...props} size="sm" label="Small">
                    <Tag id="1" textValue="Developer">
                        <SparklesIcon />
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer">
                        <Text>Designer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "8rem" }}>
                        <Text>Executive Officer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="md" label="Medium">
                    <Tag id="1" textValue="Developer">
                        <SparklesIcon />
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer">
                        <Text>Designer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "7rem" }}>
                        <Text>Executive Officer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="lg" label="Large">
                    <Tag id="1" textValue="Developer">
                        <SparklesIcon />
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer">
                        <Text>Designer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "8rem" }}>
                        <Text>Executive Officer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                </TagGroup>
            </Stack>
        );
    }
} satisfies Story;

export const AvatarStory = {
    name: "Avatar",
    render: props => {
        return (
            <Stack>
                <TagGroup {...props} size="sm" label="Small">
                    <Tag id="1" textValue="Frodo Baggin">
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Text>Frodo Baggin</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith">
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "6rem" }}>
                        <Text>John Smith</Text>
                        <Avatar name="John Smith" />
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="md" label="Medium">
                    <Tag id="1" textValue="Frodo Baggin">
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Text>Frodo Baggin</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith">
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "6rem" }}>
                        <Text>John Smith</Text>
                        <Avatar name="John Smith" />
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="lg" label="Large">
                    <Tag id="1" textValue="Frodo Baggin">
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Text>Frodo Baggin</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith">
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "7rem" }}>
                        <Text>John Smith</Text>
                        <Avatar name="John Smith" />
                    </Tag>
                </TagGroup>
            </Stack>
        );
    }
} satisfies Story;

export const Count = {
    render: props => {
        return (
            <Stack>
                <TagGroup {...props} size="sm" label="Small">
                    <Tag id="1" textValue="Developer">
                        <Badge>12</Badge>
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer" isDisabled>
                        <Text>Designer</Text>
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "6rem" }}>
                        <Text>Executive Officer</Text>
                        <Badge>100</Badge>
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="md" label="Medium">
                    <Tag id="1" textValue="Developer">
                        <Badge>12</Badge>
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer">
                        <Text>Designer</Text>
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "6rem" }}>
                        <Text>Executive Officer</Text>
                        <Badge>100</Badge>
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="lg" label="Large">
                    <Tag id="1" textValue="Developer">
                        <Badge>12</Badge>
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer">
                        <Text>Designer</Text>
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "7rem" }}>
                        <Text>Executive Officer</Text>
                        <Badge>100</Badge>
                    </Tag>
                </TagGroup>
            </Stack>
        );
    },
    args: {
        selectionMode: "multiple"
    }
} satisfies Story;

export const Invalid = {
    render: props => {
        return (
            <Stack>
                <TagGroup {...props} size="sm" label="Small" isInvalid>
                    <Tag id="1" textValue="Developer">Developer</Tag>
                    <Tag id="2" textValue="Designer">Designer</Tag>
                </TagGroup>
                <TagGroup {...props} size="md" label="Medium" isInvalid>
                    <Tag id="1" textValue="Developer">Developer</Tag>
                    <Tag id="2" textValue="Designer">Designer</Tag>
                </TagGroup>
                <TagGroup {...props} size="lg" label="Large" isInvalid>
                    <Tag id="1" textValue="Developer">Developer</Tag>
                    <Tag id="2" textValue="Designer">Designer</Tag>
                </TagGroup>
            </Stack>
        );
    }
} satisfies Story;

export const Removable = {
    render: props => {
        return (
            <TagGroup {...props} label="Removable">
                <Tag id="1" textValue="Developer">Developer</Tag>
                <Tag id="2" textValue="Designer">Designer</Tag>
            </TagGroup>
        );
    },
    args: {
        onRemove: () => {}
    }
} satisfies Story;

export const Readonly = {
    render: props => {
        return (
            <TagGroup {...props} label="Readonly">
                <Tag id="1" textValue="Developer">Developer</Tag>
                <Tag id="2" textValue="Designer">Designer</Tag>
            </TagGroup>
        );
    },
    args: {
        onRemove: () => {},
        isReadOnly: true
    }
}satisfies Story;

export const Everything = {
    render: props => {
        return (
            <Stack>
                <TagGroup {...props} size="sm" label="Small">
                    <Tag id="1" textValue="Frodo Baggins">
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Badge>12</Badge>
                        <SparklesIcon />
                        <Text>Frodo Baggins</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith">
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                        <SparklesIcon />
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "10rem" }}>
                        <Avatar name="John Smith" />
                        <Text>John Smith</Text>
                        <SparklesIcon />
                        <Badge>100</Badge>
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="md" label="Medium">
                    <Tag id="1" textValue="Frodo Baggins">
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Badge>12</Badge>
                        <SparklesIcon />
                        <Text>Frodo Baggins</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith">
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                        <SparklesIcon />
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "10rem" }}>
                        <Avatar name="John Smith" />
                        <Text>John Smith</Text>
                        <SparklesIcon />
                        <Badge>100</Badge>
                    </Tag>
                </TagGroup>
                <TagGroup {...props} size="lg" label="Large">
                    <Tag id="1" textValue="Frodo Baggins">
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Badge>12</Badge>
                        <SparklesIcon />
                        <Text>Frodo Baggins</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith">
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                        <SparklesIcon />
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "12rem" }}>
                        <Avatar name="John Smith" />
                        <Text>John Smith</Text>
                        <SparklesIcon />
                        <Badge>100</Badge>
                    </Tag>
                </TagGroup>
            </Stack>
        );
    },
    args: {
        onRemove: (ids: Selection) => {
            alert(`Remove: ${[...ids]}`);
        }
    }
} satisfies Story;

const StateTemplate = (args: Partial<TagGroupProps<unknown>>) => (
    <Stack alignY="end">
        <TagGroup {...args} data-testid="tag-group" aria-label="List of variants">
            <Tag id="1" textValue="Neutral" variant="neutral">
                <Text>Neutral</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="2" textValue="Subdued" variant="subdued">
                <Text>Subdued</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="3" textValue="Progress" variant="progress">
                <Text>Progress</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="4" textValue="Positive" variant="positive">
                <Text>Positive</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="5" textValue="Caution" variant="caution">
                <Text>Caution</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="6" textValue="Negative" variant="negative">
                <Text>Negative</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="7" textValue="Option1" variant="option1">
                <Text>Option1</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="8" textValue="Option2" variant="option2">
                <Text>Option2</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="9" textValue="Option3" variant="option3">
                <Text>Option3</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="10" textValue="Option4" variant="option4">
                <Text>Option4</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="11" textValue="Option5" variant="option5">
                <Text>Option5</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
            <Tag id="12" textValue="Option6" variant="option6">
                <Text>Option6</Text>
                <SparklesIcon />
                <Badge variant="subdued">99+</Badge>
            </Tag>
        </TagGroup>
    </Stack>
);

export const DefaultStates: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const tagGroups = canvas.getAllByTestId("tag-group");
        tagGroups.forEach(tagGroup => {
            const tags = tagGroup.querySelectorAll(".hop-Tag");
            tags.forEach(tag => {
                if (!tag.getAttribute("data-disabled")) {
                    if (tagGroup.getAttribute("data-chromatic-force-focus")) {
                        tag.setAttribute("data-focus-visible", "true");
                    }

                    if (tagGroup.getAttribute("data-chromatic-force-hover")) {
                        tag.setAttribute("data-hovered", "true");
                    }

                    if (tagGroup.getAttribute("data-chromatic-force-press")) {
                        tag.setAttribute("data-pressed", "true");
                    }
                }
            });

            tagGroup.removeAttribute("data-chromatic-force-focus");
            tagGroup.removeAttribute("data-chromatic-force-hover");
            tagGroup.removeAttribute("data-chromatic-force-press");
        });
    },
    render: args => {
        return (
            <Stack>
                <h1>Default</h1>
                <StateTemplate {...args} />
                <h1>Disabled</h1>
                <StateTemplate {...args} disabledKeys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]} />
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
            </Stack>
        );
    },
    args: {
        onRemove: (ids: Selection) => {
            alert(`Remove: ${[...ids]}`);
        },
        selectionMode: "multiple"
    }
};
