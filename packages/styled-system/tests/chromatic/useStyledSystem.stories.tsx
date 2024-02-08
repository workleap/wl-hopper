import { Div, type DivProps } from "../../src/html-wrappers/html.ts";
import { Breakpoints } from "../../src/responsive/Breakpoints.ts";
import type { Meta, StoryObj } from "@storybook/react";

const viewports = Object.values(Breakpoints);

const meta: Meta<DivProps> = {
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
};

export default meta;
type UseStyledSystemStory = StoryObj<typeof meta>;

export const EverySingleBreakpoints: UseStyledSystemStory = {
    args: {
        backgroundColor: { base: "core_sapphire-300", xs: "core_moss-300", sm: "core_amanita-300", md: "core_orchid-bloom-300", lg: "core_quetzal-300", xl: "core_moss-300" }
    }
};

export const MatchHigherBreakpoint: UseStyledSystemStory = {
    args: {
        backgroundColor: { base: "core_sapphire-400", sm: "core_sapphire-400" }
    }
};

export const MatchBase: UseStyledSystemStory = {
    args: {
        backgroundColor: { base: "core_sapphire-400" }
    }
};
