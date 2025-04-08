import type { Meta, StoryObj } from "@storybook/react";

import { Div, type DivProps } from "../../src/html-wrappers/html.ts";
import { Breakpoints } from "../../src/responsive/Breakpoints.ts";

const viewports = Object.values(Breakpoints);

const meta = {
    title: "Styled System/useStyledSystem",
    component: Div,
    parameters: {
        chromatic: {
            delay: 100,
            viewports: viewports
        },
        controls: { hideNoControlsWarning: true }
    },
    args: {
        color: "core_samoyed",
        width: "core_960",
        children: "Hop"
    }
} satisfies Meta<DivProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EverySingleBreakpoints: Story = {
    args: {
        backgroundColor: { base: "core_sapphire-300", xs: "core_moss-300", sm: "core_amanita-300", md: "core_orchid-bloom-300", lg: "core_quetzal-300", xl: "core_moss-300" }
    }
};

export const MatchHigherBreakpoint: Story = {
    args: {
        backgroundColor: { base: "core_sapphire-400", sm: "core_sapphire-400" }
    }
};

export const MatchBase: Story = {
    args: {
        backgroundColor: { base: "core_sapphire-400" }
    }
};
