import {
    CloseButton,
    Content,
    CustomModal,
    Div,
    Heading,
    Text
} from "@hopper-ui/components";
import { hopperParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Components/Modal/CustomModal/light",
    component: CustomModal,
    parameters: {
        ...hopperParameters({ colorSchemes: ["light"] })
    },
    decorators: [
        Story => (
            <Div
                width="100%"
                // Important for chromatic tests.
                UNSAFE_minHeight="800px"
            >
                <Story />
            </Div>
        )
    ],
    args: {
        isOpen: true,
        padding: "inset-lg",
        position: "relative"
    }
} satisfies Meta<typeof CustomModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <CustomModal {...args}>
            <CloseButton position="absolute" top="24px" right="24px" />
            <Heading slot="title" paddingBottom="inset-lg">Fascinating Frog Facts!</Heading>
            <Content>
                <Text>Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!</Text>
            </Content>
        </CustomModal>
    )
} satisfies Story;

export const Small = {
    ...Default,
    args: {
        size: "sm"
    }
};

export const Large = {
    ...Default,
    args: {
        size: "lg"
    }
};

export const ExtraLarge = {
    ...Default,
    args: {
        size: "xl"
    }
};

export const FullScreen = {
    ...Default,
    args: {
        size: "fullscreen"
    }
};

export const FullscreenTakeover = {
    ...Default,
    args: {
        size: "fullscreenTakeover"
    }
};
