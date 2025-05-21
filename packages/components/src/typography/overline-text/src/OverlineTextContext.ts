import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { OverlineTextProps } from "./OverlineText.tsx";

export const OverlineTextContext = createContext<ContextValue<OverlineTextProps, HTMLSpanElement>>({});

OverlineTextContext.displayName = "OverlineTextContext";
