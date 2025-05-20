import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { BadgeProps } from "./Badge.tsx";

export interface BadgeContextValue extends BadgeProps {
    isHovered?: boolean;
    isPressed?: boolean;
    isSelected?: boolean;
}
export const BadgeContext = createContext<ContextValue<BadgeContextValue, HTMLSpanElement>>({});

BadgeContext.displayName = "BadgeContext";
