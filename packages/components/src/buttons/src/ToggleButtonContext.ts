import { type Context, createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ToggleButtonProps } from "./ToggleButton.tsx";

export interface ToggleButtonContextValue extends Partial<ToggleButtonProps> {
    /**
     *  Contexts to clear.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the button is hidden or not.
    */
    isHidden?: boolean;
}

export const ToggleButtonContext = createContext<ContextValue<ToggleButtonContextValue, HTMLButtonElement>>({});

ToggleButtonContext.displayName = "ToggleButtonContext";
