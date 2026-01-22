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
import { allColorModes } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Frog, MossyFrog } from "../assets/index.ts";

const meta = {
    title: "Components/Modal",
    component: Modal,
    parameters: {
        chromatic: {
            modes: allColorModes
        }
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

export const ImageStory = {
    name: "Image",
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

export const Choice = {
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

export const HeaderStory = {
    name: "Header",
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

export const FooterStory = {
    name: "Footer",
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

export const ButtonStory = {
    name: "Button",
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

export const ButtonGroupStory = {
    name: "Button Group",
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

export const LongTitle = {
    render: args => (
        <Modal {...args}>
            {({ close }) => (
                <>
                    <Heading>Fascinating Frog Facts so fascinating that this title becomes really long!</Heading>
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
        isDismissable: false
    }
} satisfies Story;

export const Everything = {
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
    ...Everything,
    args: {
        size: "sm"
    }
};

export const Large = {
    ...Everything,
    args: {
        size: "lg"
    }
};

export const ExtraLarge = {
    ...Everything,
    args: {
        size: "xl"
    }
};

export const Fullscreen = {
    ...Everything,
    args: {
        size: "fullscreen"
    }
};

export const FullscreenTakeover = {
    ...Everything,
    args: {
        size: "fullscreenTakeover"
    }
};
