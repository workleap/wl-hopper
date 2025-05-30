import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { ContentProps } from "./Content.tsx";

export interface ContentContextValue extends ContentProps {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the content is hidden or not.
    */
    isHidden?: boolean;
}

export const ContentContext = createContext<ContextValue<ContentContextValue, HTMLDivElement>>({});

ContentContext.displayName = "ContentContext";
