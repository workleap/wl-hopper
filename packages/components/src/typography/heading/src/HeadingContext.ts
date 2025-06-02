import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { HeadingProps } from "./Heading.tsx";


export interface HeadingContextValue extends HeadingProps {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the heading is hidden or not.
    */
    isHidden?: boolean;
}

export const HeadingContext = createContext<ContextValue<HeadingContextValue, HTMLHeadingElement>>({});

HeadingContext.displayName = "HeadingContext";
