import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { PopoverProps } from "./Popover.tsx";

export const PopoverContext = createContext<ContextValue<PopoverProps, HTMLElement>>({});

PopoverContext.displayName = "PopoverContext";
