import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { ButtonProps } from "./Button.tsx";

export interface ButtonContextValue extends ButtonProps {
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

export const ButtonContext = createContext<ContextValue<ButtonContextValue, HTMLButtonElement>>({});

ButtonContext.displayName = "ButtonContext";
