import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ActionBarProps } from "./ActionBar.tsx";

export const ActionBarContext = createContext<ContextValue<ActionBarProps, HTMLDivElement>>({});

ActionBarContext.displayName = "ActionBarContext";
