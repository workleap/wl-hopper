import type { Meta, StoryObj } from "@storybook/react";

import { Inline, Stack } from "../../../layout/index.ts";
import { Badge } from "../../src/Badge.tsx";

const meta = {
    title: "Components/Badge",
    component: Badge,
    args: {
        children: "12"
    }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
    render: props => (
        <Stack>
            <h1>Default</h1>
            <Badge {...props} />
            <h1>Text</h1>
            <Badge {...props}>New</Badge>
            <h1>Disabled</h1>
            <Badge {...props} isDisabled />
        </Stack>
    )
} satisfies Story;

export const Secondary = {
    ...Primary,
    args: {
        variant: "secondary"
    }
} satisfies Story;

export const Subdued = {
    ...Primary,
    args: {
        variant: "subdued"
    }
} satisfies Story;

export const indeterminate = {
    render: props => (
        <Stack>
            <h1>Variants</h1>
            <Inline>
                <Badge {...props} />
                <Badge {...props} variant="secondary" />
                <Badge {...props} variant="subdued" />
            </Inline>
            <h1>Disabled</h1>
            <Inline>
                <Badge {...props} isDisabled />
                <Badge {...props} variant="secondary" isDisabled />
                <Badge {...props} variant="subdued" isDisabled />
            </Inline>
        </Stack>
    ),
    args: {
        isIndeterminate: true
    }
} satisfies Story;

export const Styling = {
    render: props => (
        <Inline>
            <Badge border="warning" {...props} />
            <Badge className="border-red" {...props} />
            <Badge style={{ border: "1px solid darkRed" }} {...props}>New</Badge>
        </Inline>
    )
} satisfies Story;

export const AccessToDisabledState = {
    render: props => (
        <Inline>
            <Badge
                {...props}
                isDisabled
                style={({ isDisabled }) => isDisabled ? { border: "1px solid red" } : {}}
            />
            <Badge {...props} isDisabled>
                {({ isDisabled }) => (
                    isDisabled ? "Disabled" : ""
                )}
            </Badge>
        </Inline>
    )
} satisfies Story;

export const AccessToIndeterminateState = {
    render: props => (
        <Badge
            {...props}
            isIndeterminate
            style={({ isIndeterminate }) => isIndeterminate ? { border: "1px solid red" } : {}}
        />
    )
} satisfies Story;
