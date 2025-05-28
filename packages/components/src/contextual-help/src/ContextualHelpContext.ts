import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ContextualHelpProps } from "./ContextualHelp.tsx";

export const ContextualHelpContext = createContext<ContextValue<Partial<ContextualHelpProps>, HTMLButtonElement>>({});

ContextualHelpContext.displayName = "ContextualHelpContext";
