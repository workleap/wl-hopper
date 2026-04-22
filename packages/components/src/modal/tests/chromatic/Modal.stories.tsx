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
import { CheckmarkIcon, InfoIcon, MailIcon, StarIcon } from "@hopper-ui/icons";
import { allColorModesAndThemes } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Frog, MossyFrog } from "../assets/index.ts";

const meta = {
    title: "Components/Modal",
    component: Modal,
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

export const GlassyBackground_WithText = {
    render: args => (
        <>
            <Flex direction="column" gap="stack-lg" padding="inset-xl">
                <Heading>Background Content</Heading>
                <Text>This content sits behind the modal overlay to test the glass effect.</Text>
                <Flex gap="stack-md">
                    <Flex direction="column" gap="stack-sm" flex={1}>
                        <InfoIcon size="lg" />
                        <Heading>Information</Heading>
                        <Text>Important details about your account and recent activity are displayed here. Stay informed about changes, updates, and announcements relevant to your workspace. Regularly reviewing this section ensures you never miss critical information that may affect your workflow or team collaboration.</Text>
                    </Flex>
                    <Flex direction="column" gap="stack-sm" flex={1}>
                        <CheckmarkIcon size="lg" />
                        <Heading>Completed</Heading>
                        <Text>All tasks have been reviewed and marked as done. Each completed item represents a step forward in your project's progress. Keeping track of finished work helps the team celebrate milestones, measure velocity, and plan upcoming sprints with greater confidence and accuracy.</Text>
                    </Flex>
                    <Flex direction="column" gap="stack-sm" flex={1}>
                        <StarIcon size="lg" />
                        <Heading>Favorites</Heading>
                        <Text>Your starred items and bookmarked content appear here for quick access. Organize the resources, documents, and tools you use most often so you can get back to them without searching. A well-maintained favorites list dramatically reduces the time spent navigating large workspaces.</Text>
                    </Flex>
                    <Flex direction="column" gap="stack-sm" flex={1}>
                        <MailIcon size="lg" />
                        <Heading>Messages</Heading>
                        <Text>Unread notifications and incoming messages from your team are collected in this section. Timely responses keep projects on track and foster a culture of open communication. Make sure to check this regularly to stay aligned with your colleagues and address any pending requests promptly.</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Modal {...args}>
                <Heading>Glassy Modal</Heading>
                <Content>
                    <Text>
                        This modal is rendered over a text and icon background to verify the glass/blur overlay effect looks correct.
                    </Text>
                </Content>
                <ButtonGroup>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Save</Button>
                </ButtonGroup>
            </Modal>
        </>
    )
} satisfies Story;

export const GlassyBackground_WithImage = {
    render: args => (
        <>

            <Flex direction="column" gap="stack-lg" padding="inset-xl">
                <Heading>Background Content</Heading>
                <Text>This content sits behind the modal overlay to test the glass effect.</Text>
                <Flex gap="stack-md">
                    <Card flex={1}>
                        <Image objectFit="cover" alt="Frog" src={Frog} />
                        <Flex direction="column" gap="stack-sm" padding="inset-md">
                            <Heading>Frog</Heading>
                            <Content>Common frog found in ponds and marshes.</Content>
                        </Flex>
                    </Card>
                    <Card flex={1}>
                        <Image objectFit="cover" alt="Mossy Frog" src={MossyFrog} />
                        <Flex direction="column" gap="stack-sm" padding="inset-md">
                            <Heading>Mossy Frog</Heading>
                            <Content>Camouflaged tree frog with bark-like skin.</Content>
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
            <Modal {...args}>
                <Heading>Glassy Modal</Heading>
                <Content>
                    <Text>
                        This modal is rendered over a colorful gradient background to verify the glass/blur overlay effect looks correct.
                    </Text>
                </Content>
                <ButtonGroup>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Save</Button>
                </ButtonGroup>
            </Modal>
        </>
    )
} satisfies Story;
