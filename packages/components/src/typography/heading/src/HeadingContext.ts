import type { ResponsiveProp } from "@hopper-ui/styled-system";
import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { HeadingProps, HeadingSize } from "./Heading.tsx";

export interface HeadingContextValue extends Omit<HeadingProps, "size"> {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the heading is hidden or not.
    */
    isHidden?: boolean;

    /**
     * The size of the heading.
     * The value in the context also allows unset, which gives give the ability to the parent component to remove all styles from the heading.
     * @default "md"
     */
    size?: ResponsiveProp<HeadingSize | "unset">;
}

export const HeadingContext = createContext<ContextValue<HeadingContextValue, HTMLHeadingElement>>({});

HeadingContext.displayName = "HeadingContext";
