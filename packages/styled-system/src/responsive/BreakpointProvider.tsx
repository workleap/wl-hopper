import { type ReactNode, useCallback, useMemo, useSyncExternalStore } from "react";

import { supportsMatchMedia } from "../utils/useMediaQuery.ts";

import { BreakpointContext } from "./BreakpointContext.tsx";
import { type Breakpoint, Breakpoints } from "./Breakpoints.ts";

export const DefaultUnsupportedMatchMediaBreakpoint: Breakpoint = "lg";

export interface BreakpointProviderProps {
    /** The children of the component */
    children: ReactNode;
    /**
     * The breakpoint to use when the browser does not support matchMedia.
     * @default "lg"
     */
    unsupportedMatchMediaBreakpoint?: Breakpoint;
}

// Inspired from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/BreakpointProvider.tsx
export function BreakpointProvider({
    children,
    unsupportedMatchMediaBreakpoint = DefaultUnsupportedMatchMediaBreakpoint
}: BreakpointProviderProps) {
    const matchedBreakpoints = useMatchedBreakpoints(unsupportedMatchMediaBreakpoint);

    return <BreakpointContext.Provider value={{ matchedBreakpoints }}>{children}</BreakpointContext.Provider>;
}

const BreakpointEntries = (Object.entries(Breakpoints) as [Breakpoint, number][]).sort(
    ([, valueA], [, valueB]) => valueB - valueA
);

// Every provider reads the same window, so they share one snapshot.
let cachedMatchedBreakpoints: Breakpoint[] = [];

function getMatchedBreakpoints() {
    const matched: Breakpoint[] = [];

    for (const [breakpoint, value] of BreakpointEntries) {
        if (window.matchMedia(`(min-width: ${value}px)`).matches) {
            matched.push(breakpoint);
        }
    }

    matched.push("base");

    // useSyncExternalStore re-renders whenever the snapshot is a new reference, so keep the cached array when nothing changed.
    if (
        matched.length !== cachedMatchedBreakpoints.length ||
        matched.some((breakpoint, idx) => breakpoint !== cachedMatchedBreakpoints[idx])
    ) {
        cachedMatchedBreakpoints = matched;
    }

    return cachedMatchedBreakpoints;
}

function subscribeToResize(onChange: () => void) {
    window.addEventListener("resize", onChange);

    return () => {
        window.removeEventListener("resize", onChange);
    };
}

function subscribeToNothing() {
    return () => {};
}

function useMatchedBreakpoints(unsupportedMatchMediaBreakpoint: Breakpoint = DefaultUnsupportedMatchMediaBreakpoint) {
    const fallbackBreakpoints = useMemo(() => [unsupportedMatchMediaBreakpoint], [unsupportedMatchMediaBreakpoint]);
    const getFallbackBreakpoints = useCallback(() => fallbackBreakpoints, [fallbackBreakpoints]);

    // useSyncExternalStore reads the snapshot again once it has subscribed, so a viewport change between the render and
    // the subscription is not missed. The server snapshot is used on the server and while hydrating, since the media
    // queries can't match there; the real breakpoints are rendered right after hydration.
    return useSyncExternalStore(
        supportsMatchMedia ? subscribeToResize : subscribeToNothing,
        supportsMatchMedia ? getMatchedBreakpoints : getFallbackBreakpoints,
        getFallbackBreakpoints
    );
}
