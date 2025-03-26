import type { FocusableElement } from "@react-types/shared";
import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { TooltipTriggerProps } from "./TooltipTrigger.tsx";

export const TooltipTriggerContext = createContext<ContextValue<TooltipTriggerProps, FocusableElement>>({});

TooltipTriggerContext.displayName = "TooltipTriggerContext";

export const InternalTooltipTriggerContext = createContext<Partial<TooltipTriggerProps>>({});

InternalTooltipTriggerContext.displayName = "InternalTooltipTriggerContext";
