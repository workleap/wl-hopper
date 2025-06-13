import { type Context, createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { IllustrationProps } from "./Illustration.tsx";

export interface IllustrationContextValue extends Partial<IllustrationProps> {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the image is hidden or not.
    */
    isHidden?: boolean;
}

export const IllustrationContext = createContext<ContextValue<IllustrationContextValue, HTMLDivElement>>({});

IllustrationContext.displayName = "IllustrationContext";
