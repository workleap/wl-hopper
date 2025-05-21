import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { PopoverBaseProps } from "./PopoverBase.tsx";

export const PopoverBaseContext = createContext<ContextValue<PopoverBaseProps, HTMLElement>>({});

PopoverBaseContext.displayName = "PopoverBaseContext";
