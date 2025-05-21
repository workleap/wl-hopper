import { OrderedListIcon, UnorderedListIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";

import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/Text/index.ts";
import { SegmentedControl, SegmentedControlItem } from "../../src/index.ts";

const meta = {
    title: "Components/SegmentedControl",
    component: SegmentedControl
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => (
        <SegmentedControl defaultSelectedKey="day" {...props}>
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    ),
    args: {
        "aria-label": "Time granularity"
    }
} satisfies Story;

export const Sizes = {
    render: props => (
        <Stack>
            <Inline>
                <SegmentedControl defaultSelectedKey="day" {...props}>
                    <SegmentedControlItem id="day">Day</SegmentedControlItem>
                    <SegmentedControlItem id="week">Week</SegmentedControlItem>
                    <SegmentedControlItem id="month">Month</SegmentedControlItem>
                    <SegmentedControlItem id="year">Year</SegmentedControlItem>
                </SegmentedControl>
                <SegmentedControl defaultSelectedKey="day" {...props} size="md">
                    <SegmentedControlItem id="day">Day</SegmentedControlItem>
                    <SegmentedControlItem id="week">Week</SegmentedControlItem>
                    <SegmentedControlItem id="month">Month</SegmentedControlItem>
                    <SegmentedControlItem id="year">Year</SegmentedControlItem>
                </SegmentedControl>
            </Inline>
            <Inline>
                <SegmentedControl defaultSelectedKey="unordered" {...props}>
                    <SegmentedControlItem id="unordered">
                        <UnorderedListIcon />
                        <Text>Unordered</Text>
                    </SegmentedControlItem>
                    <SegmentedControlItem id="ordered">
                        <OrderedListIcon />
                        <Text>Ordered</Text>
                    </SegmentedControlItem>
                </SegmentedControl>
                <SegmentedControl defaultSelectedKey="unordered" size="md" {...props}>
                    <SegmentedControlItem id="unordered">
                        <UnorderedListIcon />
                        <Text>Unordered</Text>
                    </SegmentedControlItem>
                    <SegmentedControlItem id="ordered">
                        <OrderedListIcon />
                        <Text>Ordered</Text>
                    </SegmentedControlItem>
                </SegmentedControl>
            </Inline>
            <Inline>
                <SegmentedControl defaultSelectedKey="unordered" {...props} >
                    <SegmentedControlItem aria-label="Unordered" id="unordered"><UnorderedListIcon /></SegmentedControlItem>
                    <SegmentedControlItem aria-label="Ordered" id="ordered"><OrderedListIcon /></SegmentedControlItem>
                </SegmentedControl>
                <SegmentedControl defaultSelectedKey="unordered" size="md" {...props} >
                    <SegmentedControlItem aria-label="Unordered" id="unordered"><UnorderedListIcon /></SegmentedControlItem>
                    <SegmentedControlItem aria-label="Ordered" id="ordered"><OrderedListIcon /></SegmentedControlItem>
                </SegmentedControl>
            </Inline>
        </Stack>
    ),
    args: {
        "aria-label": "Example of sizes"
    }
} satisfies Story;

export const WithIcons = {
    render: props => (
        <SegmentedControl defaultSelectedKey="unordered" {...props}>
            <SegmentedControlItem id="unordered">
                <UnorderedListIcon />
                <Text>Unordered</Text>
            </SegmentedControlItem>
            <SegmentedControlItem id="ordered">
                <OrderedListIcon />
                <Text>Ordered</Text>
            </SegmentedControlItem>
        </SegmentedControl>
    ),
    args: {
        "aria-label": "List organization"
    }
} satisfies Story;

export const WithTrailingIcons = {
    render: props => (
        <SegmentedControl defaultSelectedKey="unordered" {...props}>
            <SegmentedControlItem id="unordered">
                <Text>Unordered</Text>
                <UnorderedListIcon />
            </SegmentedControlItem>
            <SegmentedControlItem id="ordered">
                <Text>Ordered</Text>
                <OrderedListIcon />
            </SegmentedControlItem>
        </SegmentedControl>
    ),
    args: {
        "aria-label": "List organization"
    }
} satisfies Story;

export const OnlyIcons = {
    render: props => (
        <SegmentedControl defaultSelectedKey="unordered" {...props} >
            <SegmentedControlItem aria-label="Unordered" id="unordered"><UnorderedListIcon /></SegmentedControlItem>
            <SegmentedControlItem aria-label="Ordered" id="ordered"><OrderedListIcon /></SegmentedControlItem>
        </SegmentedControl>
    ),
    args: {
        "aria-label": "List organization"
    }
} satisfies Story;

export const Justified = {
    render: props => (
        <SegmentedControl UNSAFE_width="400px" isJustified defaultSelectedKey="day" {...props} >
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    ),
    args: {
        "aria-label": "List organization"
    }
} satisfies Story;

export const Disabled = {
    render: props => (
        <Stack>
            <SegmentedControl isDisabled defaultSelectedKey="day" {...props}>
                <SegmentedControlItem id="day">Day</SegmentedControlItem>
                <SegmentedControlItem id="week">Week</SegmentedControlItem>
                <SegmentedControlItem id="month">Month</SegmentedControlItem>
                <SegmentedControlItem id="year">Year</SegmentedControlItem>
            </SegmentedControl>
            <SegmentedControl isDisabled defaultSelectedKey="unordered" {...props}>
                <SegmentedControlItem id="unordered">
                    <UnorderedListIcon />
                    <Text>Unordered</Text>
                </SegmentedControlItem>
                <SegmentedControlItem id="ordered">
                    <OrderedListIcon />
                    <Text>Ordered</Text>
                </SegmentedControlItem>
            </SegmentedControl>
            <SegmentedControl isDisabled defaultSelectedKey="unordered" {...props} >
                <SegmentedControlItem aria-label="Unordered" id="unordered"><UnorderedListIcon /></SegmentedControlItem>
                <SegmentedControlItem aria-label="Ordered" id="ordered"><OrderedListIcon /></SegmentedControlItem>
            </SegmentedControl>
        </Stack>
    ),
    args: {
        "aria-label": "Examples of disabled segmented controls"
    }
} satisfies Story;

