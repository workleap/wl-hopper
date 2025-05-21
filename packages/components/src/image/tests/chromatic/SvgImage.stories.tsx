
import type { Meta, StoryObj } from "@storybook/react";

import { Inline } from "../../../layout/index.ts";
import { NoResults } from "../../assets/index.ts";
import { SvgImage } from "../../src/SvgImage.tsx";

const meta = {
    title: "Components/SvgImage",
    component: SvgImage,
    args: {
        src: NoResults,
        "aria-label": "No Results",
        stroke: "neutral"
    }
} satisfies Meta<typeof SvgImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stroke = {
    args: {
        stroke: "neutral"
    }
} satisfies Story;

export const Fill = {
    args: {
        fill: "neutral"
    }
} satisfies Story;

export const Width = {
    args: {
        UNSAFE_width: "100px"
    }
} satisfies Story;

export const Height = {
    args: {
        UNSAFE_height: "100px"
    }
} satisfies Story;

export const Styling = {
    render: args => (
        <Inline>
            <SvgImage className="stroke-red" {...args} />
            <SvgImage style={{ stroke: "red" }} {...args} />
        </Inline>
    )
} satisfies Story;
