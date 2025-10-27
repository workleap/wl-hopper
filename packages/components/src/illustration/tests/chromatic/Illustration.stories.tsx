import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Image } from "../../../image/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Frog } from "../../assets/index.ts";
import { Illustration } from "../../src/Illustration.tsx";

const meta = {
    title: "Components/Illustration",
    component: Illustration
} satisfies Meta<typeof Illustration>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: () => (
        <Illustration>
            <Image src={Frog} alt="Frog" UNSAFE_width="150px" />
        </Illustration>
    )
} satisfies Story;

export const Horizontal = {
    render: () => (
        <Stack>
            <Illustration orientation="horizontal" UNSAFE_width="700px" UNSAFE_height="200px" backgroundColor="core_sapphire-200">
                <Image src={Frog} alt="Frog" />
            </Illustration>
            <Div UNSAFE_width="700px" UNSAFE_height="200px">
                <Illustration orientation="horizontal" backgroundColor="core_sapphire-200">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
            </Div>
        </Stack>
    )
} satisfies Story;

export const Vertical = {
    render: () => (
        <Inline>
            <Illustration orientation="vertical" UNSAFE_width="200px" UNSAFE_height="500px" backgroundColor="core_sapphire-200">
                <Image src={Frog} alt="Frog" />
            </Illustration>
            <Div UNSAFE_width="200px" UNSAFE_height="500px">
                <Illustration orientation="vertical" backgroundColor="core_sapphire-200">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
            </Div>
        </Inline>
    )
} satisfies Story;

export const Straight = {
    render: () => (
        <Illustration shape="straight" UNSAFE_width="700px" UNSAFE_height="200px" backgroundColor="core_sapphire-200">
            <Image src={Frog} alt="Frog" />
        </Illustration>
    )
} satisfies Story;

export const Rounded = {
    render: () => (
        <Illustration shape="rounded" UNSAFE_width="700px" UNSAFE_height="200px" backgroundColor="core_sapphire-200">
            <Image src={Frog} alt="Frog" />
        </Illustration>
    )
} satisfies Story;

export const Color = {
    render: () => (
        <Stack>
            <Inline>
                <Illustration backgroundColor="core_sapphire-200" UNSAFE_width="700px" UNSAFE_height="200px">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
                <Illustration UNSAFE_backgroundColor="rgb(151, 231, 222)" UNSAFE_width="700px" UNSAFE_height="200px">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
            </Inline>
            <Inline>
                <Illustration UNSAFE_backgroundColor="hsla(173, 63%, 75%, 1)" UNSAFE_width="700px" UNSAFE_height="200px">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
                <Illustration UNSAFE_backgroundColor="#97e7de" UNSAFE_width="700px" UNSAFE_height="200px">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
            </Inline>
        </Stack>
    )
} satisfies Story;

export const Zoom = {
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Illustration border="warning" UNSAFE_width="700px" UNSAFE_height="200px">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
            </Div>
            <Div className="zoom-out">
                <Illustration border="warning" UNSAFE_width="700px" UNSAFE_height="200px">
                    <Image src={Frog} alt="Frog" />
                </Illustration>
            </Div>
        </Stack>
    )
} satisfies Story;

export const Styling = {
    render: () => (
        <Stack>
            <Illustration border="warning" UNSAFE_width="700px" UNSAFE_height="200px">
                <Image src={Frog} alt="Frog" />
            </Illustration>
            <Illustration className="border-red" UNSAFE_width="700px" UNSAFE_height="200px">
                <Image src={Frog} alt="Frog" />
            </Illustration>
            <Illustration style={{ border: "1px solid red" }} UNSAFE_width="700px" UNSAFE_height="200px">
                <Image src={Frog} alt="Frog" />
            </Illustration>
        </Stack>
    )
} satisfies Story;
