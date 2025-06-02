import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { HeaderProps } from "./Header.tsx";

export interface HeaderContextValue extends HeaderProps {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the header is hidden or not.
    */
    isHidden?: boolean;
}

export const HeaderContext = createContext<ContextValue<HeaderContextValue, HTMLElement>>({});

HeaderContext.displayName = "HeaderContext";
