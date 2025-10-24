import { useIsSSR } from "@react-aria/ssr";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { supportsMatchMedia } from "../utils/useMediaQuery.ts";

import { BreakpointContext } from "./BreakpointContext.tsx";
import { Breakpoints, type Breakpoint } from "./Breakpoints.ts";

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

    return (
        <BreakpointContext.Provider value={{ matchedBreakpoints }} >
            {children}
        </BreakpointContext.Provider>
    );
}

function useMatchedBreakpoints(unsupportedMatchMediaBreakpoint: Breakpoint = DefaultUnsupportedMatchMediaBreakpoint) {
    const getBreakpointHandler = useCallback(() => {
        const entries =
            Object.entries(Breakpoints)
                .sort(([, valueA], [, valueB]) => valueB - valueA);
        const breakpointQueries = entries.map(([, value]) => `(min-width: ${value}px)`);

        const matched: Breakpoint[] = [];

        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for (const i in breakpointQueries) {
            const query = breakpointQueries[i];
            if (window.matchMedia(query).matches) {
                matched.push(entries[i][0] as Breakpoint);
            }
        }

        matched.push("base");

        return matched;
    }, []);

    const [matchedBreakpoints, setMatchedBreakpoints] = useState<Breakpoint[]>(
        supportsMatchMedia
            ? getBreakpointHandler()
            : [unsupportedMatchMediaBreakpoint]);

    useEffect(() => {
        if (!supportsMatchMedia) {
            return;
        }

        const handleResize = () => {
            const breakpointHandler = getBreakpointHandler();

            setMatchedBreakpoints(previousMatchedBreakpoints => {
                if (previousMatchedBreakpoints.length !== breakpointHandler.length ||
                    previousMatchedBreakpoints.some((breakpoint, idx) => breakpoint !== breakpointHandler[idx])) {
                    return [...breakpointHandler]; // Return a new array to force state change
                }

                return previousMatchedBreakpoints;
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [getBreakpointHandler]);

    // If in SSR, the media query should never match. Once the page hydrates,
    // this will update and the real value will be returned.
    const isSSR = useIsSSR();

    return isSSR ? [unsupportedMatchMediaBreakpoint] : matchedBreakpoints;
}
