import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { TooltipProps } from "./Tooltip.tsx";

export const TooltipContext = createContext<ContextValue<TooltipProps, HTMLDivElement>>({});

TooltipContext.displayName = "TooltipContext";
