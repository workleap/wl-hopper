import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "../../../Avatar/index.ts";
import { Badge } from "../../../Badge/index.ts";
import { IconList } from "../../../IconList/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Tag, type TagVariant } from "../../src/index.ts";

const meta = {
    title: "Components/Tag",
    component: Tag
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => {
        return (
            <Stack>
                <Inline>
                    <Tag id="1"size="sm" {...props}>Tag 1</Tag>
                    <Tag id="2"size="sm" {...props}>Tag 2</Tag>
                    <Tag id="3"size="sm" {...props} style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                </Inline>

                <Inline>
                    <Tag id="1">Tag 1</Tag>
                    <Tag id="2">Tag 2</Tag>
                    <Tag id="3" style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                </Inline>

                <Inline>
                    <Tag id="1" size="lg">Tag 1</Tag>
                    <Tag id="2" size="lg">Tag 2</Tag>
                    <Tag id="3" size="lg" style={{ maxWidth: "6rem" }}>Tag 3 with long text</Tag>
                </Inline>
            </Stack>
        );
    }
} satisfies Story;

export const Href = {
    render: props => {
        return (
            <Stack>
                <Inline>
                    <Tag size="sm" id="1" {...props}>Tag 1</Tag>
                    <Tag size="sm" href="www.google.com" id="2" {...props}>Tag 2</Tag>
                    <Tag size="sm" href="www.google.com" id="3" style={{ maxWidth: "5rem" }} {...props}>Tag 3 with long text</Tag>
                </Inline>

                <Inline>
                    <Tag id="1" {...props}>Tag 1</Tag>
                    <Tag id="2" {...props}>Tag 2</Tag>
                    <Tag id="3" style={{ maxWidth: "5rem" }} {...props}>Tag 3 with long text</Tag>
                </Inline>

                <Inline>
                    <Tag size="lg" id="1" {...props}>Tag 1</Tag>
                    <Tag size="lg" id="2" {...props}>Tag 2</Tag>
                    <Tag size="lg" id="3" style={{ maxWidth: "6rem" }} {...props}>Tag 3 with long text</Tag>
                </Inline>
            </Stack>
        );
    },
    args:{
        href: "www.google.com"
    }
} satisfies Story;

export const Icons = {
    render: props => {
        return (
            <Stack>
                <Inline>
                    <Tag id="1" size="sm" textValue="Developer" {...props}>
                        <SparklesIcon />
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" size="sm" textValue="Designer" {...props}>
                        <Text>Designer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                    <Tag id="3" size="sm" textValue="Designer" style={{ maxWidth: "8rem" }} {...props}>
                        <Text>Executive Officer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag id="1" size="md" textValue="Developer" {...props}>
                        <SparklesIcon />
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" size="md" textValue="Designer" {...props}>
                        <Text>Designer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                    <Tag id="3" size="md" textValue="Designer" style={{ maxWidth: "7rem" }} {...props}>
                        <Text>Executive Officer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag id="1" size="lg" textValue="Developer" {...props}>
                        <SparklesIcon />
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" size="lg" textValue="Designer" {...props}>
                        <Text>Designer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                    <Tag id="3" size="lg" textValue="Designer" style={{ maxWidth: "8rem" }} {...props}>
                        <Text>Executive Officer</Text>
                        <IconList>
                            <SparklesIcon />
                            <SparklesIcon />
                            <SparklesIcon />
                        </IconList>
                    </Tag>
                </Inline>
            </Stack>
        );
    }
} satisfies Story;

const variants: TagVariant[] = ["neutral", "subdued", "progress", "positive", "caution", "negative", "option1", "option2", "option3", "option4", "option5", "option6"];
export const AllVariants = {
    render: props => {
        return (
            <Stack>
                {variants.map(variant => (
                    <>
                        <Text>{variant}</Text>
                        <Inline>
                            <Tag id="1" variant={variant} {...props}>Tag 1</Tag>
                            <Tag id="2" variant={variant} {...props}>Tag 2</Tag>
                            <Tag id="3" variant={variant} {...props} style={{ maxWidth: "5rem" }}>Tag 3 with long text</Tag>
                        </Inline>
                    </>
                ))}
            </Stack>
        );
    }
} satisfies Story;

export const AvatarStory = {
    name: "Avatar",
    render: props => {
        return (
            <Stack>
                <Inline>
                    <Tag id="1" textValue="Frodo Baggin" size="sm" {...props}>
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Text>Frodo Baggin</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith" size="sm" {...props}>
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "6rem" }} size="sm" {...props}>
                        <Text>John Smith</Text>
                        <Avatar name="John Smith" />
                    </Tag>
                </Inline>
                <Inline>
                    <Tag id="1" textValue="Frodo Baggin"size="md" {...props}>
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Text>Frodo Baggin</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith"size="md" {...props}>
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "6rem" }}size="md" {...props}>
                        <Text>John Smith</Text>
                        <Avatar name="John Smith" />
                    </Tag>
                </Inline>
                <Inline >
                    <Tag id="1" textValue="Frodo Baggin"size="lg" {...props}>
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Text>Frodo Baggin</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith"size="lg" {...props}>
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "7rem" }} size="lg" {...props}>
                        <Text>John Smith</Text>
                        <Avatar name="John Smith" />
                    </Tag>
                </Inline>
            </Stack>
        );
    }
} satisfies Story;

export const Count = {
    render: props => {
        return (
            <Stack>
                <Inline>
                    <Tag id="1" textValue="Developer" size="sm" {...props}>
                        <Badge>12</Badge>
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer" isDisabled size="sm" {...props}>
                        <Text>Designer</Text>
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "6rem" }} size="sm" {...props}>
                        <Text>Executive Officer</Text>
                        <Badge>100</Badge>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag id="1" textValue="Developer"size="md" {...props}>
                        <Badge>12</Badge>
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer"size="md" {...props}>
                        <Text>Designer</Text>
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "6rem" }}size="md" {...props}>
                        <Text>Executive Officer</Text>
                        <Badge>100</Badge>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag id="1" textValue="Developer" size="lg" {...props}>
                        <Badge>12</Badge>
                        <Text>Developer</Text>
                    </Tag>
                    <Tag id="2" textValue="Designer" size="lg" {...props}>
                        <Text>Designer</Text>
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="Designer" style={{ maxWidth: "7rem" }} size="lg" {...props}>
                        <Text>Executive Officer</Text>
                        <Badge>100</Badge>
                    </Tag>
                </Inline>
            </Stack>
        );
    }
} satisfies Story;

export const Invalid = {
    render: props => {
        return (
            <Stack>
                <Inline>
                    <Tag id="1" textValue="Developer" size="sm" {...props}>Developer</Tag>
                    <Tag id="2" textValue="Designer" size="sm" {...props}>Designer</Tag>
                </Inline>
                <Inline>
                    <Tag id="1" textValue="Developer" size="md" {...props}>Developer</Tag>
                    <Tag id="2" textValue="Designer" size="md" {...props}>Designer</Tag>
                </Inline>
                <Inline>
                    <Tag id="1" textValue="Developer" size="lg" {...props}>Developer</Tag>
                    <Tag id="2" textValue="Designer" size="lg" {...props}>Designer</Tag>
                </Inline>
            </Stack>
        );
    },
    args: {
        isInvalid: true
    }
} satisfies Story;

export const Everything = {
    render: props => {
        return (
            <Stack>
                <Inline>
                    <Tag id="1" textValue="Frodo Baggins" size="sm" {...props}>
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Badge>12</Badge>
                        <SparklesIcon />
                        <Text>Frodo Baggins</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith" size="sm" {...props}>
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                        <SparklesIcon />
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "10rem" }} size="sm" {...props}>
                        <Avatar name="John Smith" />
                        <Text>John Smith</Text>
                        <SparklesIcon />
                        <Badge>100</Badge>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag id="1" textValue="Frodo Baggins" size="md" {...props}>
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Badge>12</Badge>
                        <SparklesIcon />
                        <Text>Frodo Baggins</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith" size="md" {...props}>
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                        <SparklesIcon />
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "10rem" }} size="md" {...props}>
                        <Avatar name="John Smith" />
                        <Text>John Smith</Text>
                        <SparklesIcon />
                        <Badge>100</Badge>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag id="1" textValue="Frodo Baggins" size="lg" {...props}>
                        <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                        <Badge>12</Badge>
                        <SparklesIcon />
                        <Text>Frodo Baggins</Text>
                    </Tag>
                    <Tag id="2" textValue="Karen Smith" size="lg" {...props}>
                        <Avatar name="Karen Smith" />
                        <Text>Karen Smith</Text>
                        <SparklesIcon />
                        <Badge variant="subdued">99+</Badge>
                    </Tag>
                    <Tag id="3" textValue="John Smith" style={{ maxWidth: "12rem" }} size="lg" {...props}>
                        <Avatar name="John Smith" />
                        <Text>John Smith</Text>
                        <SparklesIcon />
                        <Badge>100</Badge>
                    </Tag>
                </Inline>
            </Stack>
        );
    }
} satisfies Story;
