import { Breakpoints } from "@hopper-ui/components";

export interface Viewport {
    name: string;
    styles: { height: string; width: string };
    type: "desktop" | "mobile" | "tablet";
}

export type ViewportKeys = keyof typeof Breakpoints;
export type BreakpointViewports = Record<ViewportKeys, Viewport>;
const BreakpointToDeviceType: Record<ViewportKeys, Viewport["type"]> = {
    xs: "mobile",
    sm: "mobile",
    md: "tablet",
    lg: "desktop",
    xl: "desktop"
};

const viewports = (Object.keys(Breakpoints) as (ViewportKeys)[]).reduce((acc, key) => {
    acc[key] = {
        name: `Breakpoint ${key}`,
        styles: {
            height: "100%",
            width: `${Breakpoints[key]}px`
        },
        type: BreakpointToDeviceType[key]
    };

    return acc;
}, {} as BreakpointViewports);

export const viewport = {
    viewports
};
export const ViewportGlobalKey = "viewport";
