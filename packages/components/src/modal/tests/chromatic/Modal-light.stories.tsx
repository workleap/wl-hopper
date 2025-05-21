import {
    Button,
    ButtonGroup,
    Card,
    Content,
    Div,
    Flex,
    Footer,
    Header,
    Heading,
    Image,
    Modal,
    Text
} from "@hopper-ui/components";
import { hopperParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { Frog, MossyFrog } from "../assets/index.ts";

const meta = {
    title: "Components/Modal/light",
    component: Modal,
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
        isOpen: true
    }
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Modal {...args}>
            <Heading>Fascinating Frog Facts!</Heading>
            <Content>
                <Text>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Text>
            </Content>
        </Modal>
    )
} satisfies Story;

export const image = {
    render: args => (
        <Modal {...args}>
            <Image src={Frog} alt="Frog" />
            <Heading>Fascinating Frog Facts!</Heading>
            <Content>
                <Text>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Text>
            </Content>
        </Modal>
    )
} satisfies Story;

export const choice = {
    render: args => (
        <Modal {...args}>
            <Heading>Fascinating Frog Facts!</Heading>
            <Content>
                <Flex gap="stack-lg">
                    <Card flex={1}>
                        <Image objectFit="cover" alt="Frog" src={Frog} />
                        <Flex direction="column" gap="stack-sm" padding="inset-md" height="100%" justifyContent="space-between">
                            <Flex direction="column" gap="stack-sm">
                                <Heading>Frog</Heading>
                                <Content>
                                    Common frogs are found in ponds, marshes, and forests across the world. Unlike some of their flashier cousins, they rely on stealth and speed rather than bright colors to survive.
                                </Content>
                                <Button variant="secondary">Choose</Button>
                            </Flex>
                        </Flex>
                    </Card>
                    <Card flex={1}>
                        <Image objectFit="cover" alt="Mossy Frog" src={MossyFrog} />
                        <Flex direction="column" gap="stack-sm" padding="inset-md" height="100%" justifyContent="space-between">
                            <Flex direction="column" gap="stack-sm">
                                <Heading>Mossy Frog</Heading>
                                <Content>
                                    A mossy tree frog with rough, bark-like skin, blending perfectly into its surroundings for camouflage and protection.
                                </Content>
                            </Flex>
                            <Button variant="secondary">Choose</Button>
                        </Flex>
                    </Card>
                </Flex>
            </Content>
        </Modal>
    )
} satisfies Story;

export const header = {
    render: args => (
        <Modal {...args}>
            <Heading>Fascinating Frog Facts!</Heading>
            <Header>Nature’s Little Acrobats</Header>
            <Content>
                <Text>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Text>
            </Content>
        </Modal>
    )
} satisfies Story;

export const footer = {
    render: args => (
        <Modal {...args}>
            <Heading>Fascinating Frog Facts!</Heading>
            <Content>
                <Text>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Text>
            </Content>
            <Footer>
                    Copyright 2025
            </Footer>
        </Modal>
    )
} satisfies Story;

export const button = {
    render: args => (
        <Modal {...args}>
            {({ close }) => (
                <>
                    <Heading>Fascinating Frog Facts!</Heading>
                    <Content>
                        <Text>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Text>
                    </Content>
                    <Button variant="primary" onPress={close}>Save</Button>
                </>
            )}
        </Modal>
    )
} satisfies Story;

export const buttonGroup = {
    render: args => (
        <Modal {...args}>
            {({ close }) => (
                <>
                    <Heading>Fascinating Frog Facts!</Heading>
                    <Content>
                        <Text>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Text>
                    </Content>
                    <ButtonGroup>
                        <Button variant="secondary" onPress={close}>Cancel</Button>
                        <Button variant="primary" onPress={close}>Save</Button>
                    </ButtonGroup>
                </>
            )}
        </Modal>
    )
} satisfies Story;

export const NonDismissable = {
    ...Default,
    args: {
        isDismissible: false
    }
} satisfies Story;

export const everything = {
    render: args => (
        <Modal {...args}>
            {({ close }) => (
                <>
                    <Image src={Frog} alt="Frog" />
                    <Heading>Fascinating Frog Facts!</Heading>
                    <Header>Nature’s Little Acrobats</Header>
                    <Content>
                        <Text>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Text>
                    </Content>
                    <Footer>
                        Copyright 2021
                    </Footer>
                    <ButtonGroup>
                        <Button variant="secondary" onPress={close}>Cancel</Button>
                        <Button variant="primary" onPress={close}>Save</Button>
                    </ButtonGroup>
                </>
            )}
        </Modal>
    )
} satisfies Story;

export const Small = {
    ...everything,
    args: {
        size: "sm"
    }
};

export const Large = {
    ...everything,
    args: {
        size: "lg"
    }
};

export const ExtraLarge = {
    ...everything,
    args: {
        size: "xl"
    }
};

export const Fullscreen = {
    ...everything,
    args: {
        size: "fullscreen"
    }
};

export const FullscreenTakeover = {
    ...everything,
    args: {
        size: "fullscreenTakeover"
    }
};
