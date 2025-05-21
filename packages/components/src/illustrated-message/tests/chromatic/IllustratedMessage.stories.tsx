
import { Button, ButtonGroup, Content, Div, Heading, Image, Stack, SvgImage } from "@hopper-ui/components";
import type { Meta, StoryObj } from "@storybook/react";

import { Frog, NoResults } from "../../assets/index.ts";
import { IllustratedMessage } from "../../index.ts";

const meta = {
    title: "Components/IllustratedMessage",
    component: IllustratedMessage,
    decorators: [
        Story => (
            <Div width="100%" display="flex" alignItems="center" justifyContent="center">
                <Story />
            </Div>
        )
    ]
} satisfies Meta<typeof IllustratedMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: () => (
        <IllustratedMessage>
            <Image src={Frog} alt="Frog" UNSAFE_width="150px" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
        </IllustratedMessage>
    )
} satisfies Story;

export const Sizes = {
    render: () => (
        <Stack alignX="center">
            <IllustratedMessage size="sm">
                <Image src={Frog} alt="Frog" />
                <Heading>No results found</Heading>
                <Content>Try searching for something else.</Content>
            </IllustratedMessage>
            <IllustratedMessage size="md">
                <Image src={Frog} alt="Frog" />
                <Heading>No results found</Heading>
                <Content>Try searching for something else.</Content>
            </IllustratedMessage>
            <IllustratedMessage size="lg">
                <Image src={Frog} alt="Frog" />
                <Heading>No results found</Heading>
                <Content>Try searching for something else.</Content>
            </IllustratedMessage>
        </Stack>
    )
} satisfies Story;

export const SVG = {
    render: () => (
        <IllustratedMessage>
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
        </IllustratedMessage>
    )
};

export const VeryLongTitle = {
    render: () => (
        <IllustratedMessage>
            <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
            <Heading>No results found or "Mars" or another continent.</Heading>
            <Content>Try searching for something else.</Content>
        </IllustratedMessage>
    )
} satisfies Story;

export const VeryLongText = {
    render: () => (
        <IllustratedMessage>
            <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
            <Heading>No results found</Heading>
            <Content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc suscipit metus neque, non pharetra enim tincidunt dictum.
                Fusce in ultricies turpis, vitae finibus nunc. Quisque laoreet sit amet eros eget volutpat. Pellentesque non nulla dui. Sed nec felis quam. Vestibulum velit magna, fringilla ut neque cursus, porta rhoncus nulla. Suspendisse auctor sollicitudin tortor, quis viverra tellus egestas sed.
                Pellentesque ut dignissim nisi. Duis sit amet ex bibendum, pharetra purus eget, varius massa. In pulvinar dui quis dignissim commodo. Nulla facilisi..
            </Content>
        </IllustratedMessage>
    )
} satisfies Story;

export const NoHeading = {
    render: () => (
        <IllustratedMessage>
            <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
            <Content>Try searching for something else.</Content>
        </IllustratedMessage>
    )
} satisfies Story;

export const NoDescription = {
    render: () => (
        <IllustratedMessage>
            <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
            <Heading>No results found</Heading>
        </IllustratedMessage>
    )
} satisfies Story;

export const ImageTooWide = {
    render: () => (
        <IllustratedMessage>
            <Image src={Frog} alt="Frog" UNSAFE_width="10000px" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
        </IllustratedMessage>
    )
} satisfies Story;

export const Zoom = {
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <IllustratedMessage border="warning">
                    <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
                    <Heading>No results found</Heading>
                    <Content>Try searching for something else.</Content>
                </IllustratedMessage>
            </Div>
            <Div className="zoom-out">
                <IllustratedMessage border="warning">
                    <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
                    <Heading>No results found</Heading>
                    <Content>Try searching for something else.</Content>
                </IllustratedMessage>
            </Div>
        </Stack>
    )
} satisfies Story;

export const WithButton = {
    render: () => (
        <IllustratedMessage border="warning">
            <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
            <Button>Back</Button>
        </IllustratedMessage>
    )
} satisfies Story;

export const WithButtonGroup = {
    render: () => (
        <IllustratedMessage border="warning">
            <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
            <ButtonGroup>
                <Button variant="secondary">Back</Button>
                <Button>Search</Button>
            </ButtonGroup>
        </IllustratedMessage>
    )
} satisfies Story;

export const Styling = {
    render: () => (
        <Stack>
            <IllustratedMessage border="warning">
                <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
                <Heading>No results found</Heading>
                <Content>Try searching for something else.</Content>
            </IllustratedMessage>
            <IllustratedMessage className="border-red">
                <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
                <Heading>No results found</Heading>
                <Content>Try searching for something else.</Content>
            </IllustratedMessage>
            <IllustratedMessage style={{ border: "1px solid red" }}>
                <Image src={Frog} alt="Frog" UNSAFE_width="240px" />
                <Heading>No results found</Heading>
                <Content>Try searching for something else.</Content>
            </IllustratedMessage>
        </Stack>
    )
} satisfies Story;
