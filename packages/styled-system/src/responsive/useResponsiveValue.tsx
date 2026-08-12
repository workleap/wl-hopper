import { isNil, isObject } from "../utils/assertion.ts";

import { useBreakpointContext } from "./BreakpointContext.tsx";
import { type Breakpoint, Breakpoints } from "./Breakpoints.ts";

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>>;

export type ResponsiveProp<T> = T | ResponsiveValue<T>;

const ResponsiveKeys = [...Object.keys(Breakpoints), "base"];

export function isResponsiveObject(obj: unknown): obj is ResponsiveValue<unknown> {
    if (!isObject(obj)) {
        return false;
    }

    return Object.keys(obj).every(key => ResponsiveKeys.includes(key));
}

export function parseResponsiveValue<T>(value: T | ResponsiveValue<T>, matchedBreakpoints: Breakpoint[]) {
    if (isResponsiveObject(value)) {
        for (let i = 0; i < matchedBreakpoints.length; i++) {
            const responsiveValue = value[matchedBreakpoints[i]];

            if (!isNil(responsiveValue)) {
                return responsiveValue;
            }
        }

        return value["base"];
    }

    return value;
}

export function useResponsiveValue<T>(value: T | ResponsiveValue<T>) {
    const { matchedBreakpoints } = useBreakpointContext();

    return parseResponsiveValue(value, matchedBreakpoints);
}
