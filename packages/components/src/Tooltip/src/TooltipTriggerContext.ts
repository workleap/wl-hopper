import { createContext } from "react";

import type { TooltipTriggerProps } from "./TooltipTrigger.tsx";

export const TooltipTriggerContext = createContext<Partial<TooltipTriggerProps>>({});

TooltipTriggerContext.displayName = "TooltipTriggerContext";
