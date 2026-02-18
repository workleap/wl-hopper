import { allColorModesAndThemes } from "@hopper-ui/storybook-addon";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { within } from "storybook/test";

import { Button } from "../../../buttons/index.ts";
import { Content } from "../../../layout/index.ts";
import { Heading } from "../../../typography/index.ts";
import { Alert } from "../../src/Alert.tsx";
import { AlertTrigger } from "../../src/AlertTrigger.tsx";

const viewports = {
    mobile: {
        name: "Mobile",
        styles: {
            width: "375px",
            height: "667px"
        }
    }
};

const meta = {
    title: "Components/Alert",
    component: Alert,
    parameters: {
        chromatic: {
            modes: allColorModesAndThemes
        }
    },
    decorators: [
        Story => (
            <Div
                width="100%"
                // Important for chromatic tests.
                UNSAFE_minHeight="800px"
            >
                <AlertTrigger>
                    <Button variant="secondary">Open alert</Button>
                    <Story />
                </AlertTrigger>
            </Div>
        )
    ],
    args: {
        primaryButtonLabel: "Leap ahead!"
    },
    play: ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button");

        button.click();
    }
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Alert {...args}>
            <Heading>Ribbit Reminder!</Heading>
            <Content>
                Your changes have been saved—no need to leap again. Hop along, hero!
            </Content>
        </Alert>
    )
} satisfies Story;

export const Danger = {
    ...Default,
    args: {
        variant: "danger"
    }
};

export const WithCancelButton = {
    ...Default,
    args: {
        cancelButtonLabel: "Cancel"
    }
} satisfies Story;

export const WithSecondaryButton = {
    ...Default,
    args: {
        secondaryButtonLabel: "Leap back"
    }
} satisfies Story;

export const FocusOnCancelButton = {
    ...Default,
    args: {
        autoFocusButton: "cancel",
        cancelButtonLabel: "Cancel"
    }
} satisfies Story;

export const FocusOnSecondaryButton = {
    ...Default,
    args: {
        autoFocusButton: "secondary",
        secondaryButtonLabel: "Leap back"
    }
} satisfies Story;

export const Mobile = {
    ...Default,
    parameters: {
        ...meta.parameters,
        viewport: {
            viewports: viewports,
            defaultViewport: "mobile"
        }
    },
    args: {
        cancelButtonLabel: "Cancel"
    }
} satisfies Story;

export const Small = {
    ...Default,
    args: {
        size: "sm",
        cancelButtonLabel: "Cancel"
    }
} satisfies Story;

export const Medium = {
    ...Default,
    args: {
        size: "md",
        cancelButtonLabel: "Cancel"
    }
} satisfies Story;
