import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { DividerProps } from "./Divider.tsx";

export const DividerContext = createContext<ContextValue<DividerProps, HTMLElement>>({});

DividerContext.displayName = "DividerContext";
