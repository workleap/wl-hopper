import { SparklesIcon } from "@hopper-ui/icons";
import { hopperParameters } from "@hopper-ui/storybook-addon";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Avatar } from "../../../avatar/index.ts";
import { Button } from "../../../buttons/index.ts";
import { TextField } from "../../../inputs/index.ts";
import { Flex, Grid, Stack } from "../../../layout/index.ts";
import { Link } from "../../../link/index.ts";
import { Select } from "../../../select/index.ts";
import { Spinner } from "../../../spinner/index.ts";
import { Tab, TabList, Tabs } from "../../../tabs/index.ts";
import { Tag, TagGroup } from "../../../tag/index.ts";
import { H1, Text } from "../../../typography/index.ts";
import { Tooltip } from "../../src/Tooltip.tsx";
import { TooltipTrigger } from "../../src/TooltipTrigger.tsx";

const buttonText = "Hover me";
const childrenText = "This is a tooltip";

const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    args: {
        children: childrenText
    },
    parameters: {
        ...hopperParameters({ colorSchemes: ["light"] })
    },
    decorators: [
        (Story, context) => {
            if (context.parameters.skipGlobalDecorator) {
                return <Story />;
            }

            return (
                <Flex UNSAFE_marginBottom="4rem" UNSAFE_marginTop="3rem" justifyContent="center">
                    <Story />
                </Flex>
            );
        }
    ]
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <TooltipTrigger isOpen>
            <Button>{buttonText}</Button>
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const Placement = {
    render: args => (
        <Grid
            gap="core_480"
            justifyItems="center"
            templateColumns={["1fr", "1fr"]}
            width="100%"
        >
            <TooltipTrigger isOpen placement="start">
                <Button>{buttonText}</Button>
                <Tooltip {...args} />
            </TooltipTrigger>
            <TooltipTrigger isOpen placement="end">
                <Button>{buttonText}</Button>
                <Tooltip {...args} />
            </TooltipTrigger>
            <TooltipTrigger isOpen placement="right">
                <Button>{buttonText}</Button>
                <Tooltip {...args} />
            </TooltipTrigger>
            <TooltipTrigger isOpen placement="left">
                <Button>{buttonText}</Button>
                <Tooltip {...args} />
            </TooltipTrigger>
            <TooltipTrigger isOpen placement="top">
                <Button>{buttonText}</Button>
                <Tooltip {...args} />
            </TooltipTrigger>
            <TooltipTrigger isOpen placement="bottom">
                <Button>{buttonText}</Button>
                <Tooltip {...args} />
            </TooltipTrigger>
        </Grid>
    )
} satisfies Story;

export const ShouldFlip = {
    render: args => (
        <Stack>
            <H1>Original Placement: left</H1>
            <TooltipTrigger isOpen placement="left">
                <Button>{buttonText}</Button>
                <Tooltip {...args} />
            </TooltipTrigger>
        </Stack>
    ),
    decorators: [
        Story => (
            <Flex justifyContent="left">
                <Story />
            </Flex>
        )
    ],
    parameters: {
        skipGlobalDecorator: true
    }
} satisfies Story;

export const LinkTrigger = {
    render: args => (
        <TooltipTrigger isOpen>
            <Link>{buttonText}</Link>
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const DOMTrigger = {
    render: args => (
        <TooltipTrigger isOpen>
            <button type="button">{buttonText}</button>
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const IconTrigger = {
    render: function Render(args) {
        return (
            <TooltipTrigger isOpen>
                <SparklesIcon />
                <Tooltip {...args} />
            </TooltipTrigger>
        );
    }
} satisfies Story;

export const LongContent = {
    render: args => (
        <TooltipTrigger isOpen>
            <Button>{buttonText}</Button>
            <Tooltip {...args} />
        </TooltipTrigger>
    ),
    args: {
        children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in turpis
                        ac libero tincidunt hendrerit. Ut vitae nisl nec orci laoreet tristique.
                        Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.`
    },
    decorators: [
        Story => (
            <Flex UNSAFE_marginTop="8rem" justifyContent="center">
                <Story />
            </Flex>
        )
    ],
    parameters: {
        skipGlobalDecorator: true
    }
} satisfies Story;

export const DisabledTrigger = {
    render: args => (
        <TooltipTrigger isOpen>
            <Button isDisabled>{buttonText}</Button>
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const DisabledDOMTrigger = {
    render: args => (
        <TooltipTrigger isOpen>
            <button type="button" disabled>{buttonText}</button>
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const TooltipInTabs = {
    render: args => (
        <Tabs aria-label="frogs">
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <TooltipTrigger isOpen>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tooltip {...args} />
                </TooltipTrigger>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
        </Tabs>
    )
} satisfies Story;

export const TooltipInTagGroups = {
    render: args => (
        <TagGroup aria-label="tags" size="sm" label="Small">
            <Tag id="1">Tag 1</Tag>
            <TooltipTrigger isOpen>
                <Tag id="2">Tag 2</Tag>
                <Tooltip {...args} />
            </TooltipTrigger>
            <Tag id="3">Tag 3</Tag>
        </TagGroup>
    )
} satisfies Story;

export const TooltipEllipsis = {
    render: args => (
        <Div UNSAFE_width="100px">
            <TooltipTrigger isOpen>
                <Text
                    display="block"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    size="sm"
                >
                    Super long text that is going to be ellipsed
                </Text>
                <Tooltip {...args} />
            </TooltipTrigger>
        </Div>
    )
} satisfies Story;

export const TooltipSpinner = {
    render: args => (
        <TooltipTrigger isOpen>
            <Spinner aria-label="in progress" />
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const TooltipOnAvatar = {
    render: args => (
        <TooltipTrigger isOpen>
            <Avatar name="Alexandre Asselin" />
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const TooltipOnField = {
    render: args => (
        <TooltipTrigger isOpen>
            <TextField
                isFluid
                label="Deactivated by member ID:"
                placeholder="00000000-0000-0000-0000-000000000000"
                isReadOnly
            />
            <Tooltip {...args} />
        </TooltipTrigger>

    )
} satisfies Story;

export const TooltipOnStandaloneTag = {
    render: args => (
        <TooltipTrigger isOpen>
            <Tag
                maxWidth="100%"
                size="sm"
            >
                alexandre.asselin@workleap.com
            </Tag>
            <Tooltip {...args} />
        </TooltipTrigger>

    )
} satisfies Story;

export const TooltipOnSelect = {
    render: args => (
        <TooltipTrigger isOpen>
            <Select aria-label="label" isDisabled width="100%" maxWidth="100%">
                {null}
            </Select>
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;

export const LongText = {
    args: {
        children: "This is a tooltip with a very long text that should be displayed properly without any issues. It contains multiple sentences to ensure that the text wrapping and layout are functioning as expected within the tooltip component."
    },
    render: args => (
        <TooltipTrigger isOpen>
            <Button isDisabled>{buttonText}</Button>
            <Tooltip {...args} />
        </TooltipTrigger>
    )
} satisfies Story;
