import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { FooterProps } from "./Footer.tsx";

export interface FooterContextValue extends FooterProps {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the footer is hidden or not.
    */
    isHidden?: boolean;
}

export const FooterContext = createContext<ContextValue<FooterContextValue, HTMLElement>>({});

FooterContext.displayName = "FooterContext";
