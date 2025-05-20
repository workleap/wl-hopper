import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { FloatingBadgeProps } from "./FloatingBadge.tsx";

export const FloatingBadgeContext = createContext<ContextValue<FloatingBadgeProps, HTMLDivElement>>({});

FloatingBadgeContext.displayName = "FloatingBadgeContext";
