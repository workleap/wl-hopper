import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu, MenuItem } from "react-aria-components";

import { Button } from "../../../buttons/index.ts";
import { Flex, Grid, Stack } from "../../../layout/index.ts";
import { Link } from "../../../Link/index.ts";
import { Tab, TabList, Tabs } from "../../../Tabs/index.ts";
import { Tag, TagGroup } from "../../../tag/index.ts";
import { H1 } from "../../../typography/Heading/index.ts";
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

export const IconTrigger = {
    render: function Render(args) {
        return (
            <TooltipTrigger isOpen>
                <SparklesIcon role="button" tabIndex={0} />
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

export const Styling = {
    render: args => (
        <TooltipTrigger isOpen>
            <Button>{buttonText}</Button>
            <Tooltip {...args} />
        </TooltipTrigger>
    ),
    args: {
        containerProps: {
            style: {
                backgroundColor: "red",
                color: "white"
            }
        }
    }
} satisfies Story;

export const TooltipInMenuItems = {
    render: args => (
        <Menu aria-label="menu">
            <TooltipTrigger isOpen>
                <MenuItem>Item 1</MenuItem>
                <Tooltip {...args} />
            </TooltipTrigger>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
        </Menu>
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
