import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { ButtonGroupProps } from "./ButtonGroup.tsx";

export interface ButtonGroupContextValue extends ButtonGroupProps {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the button group is hidden or not.
    */
    isHidden?: boolean;
}

export const ButtonGroupContext = createContext<ContextValue<ButtonGroupContextValue, HTMLDivElement>>({});

ButtonGroupContext.displayName = "ButtonGroupContext";
