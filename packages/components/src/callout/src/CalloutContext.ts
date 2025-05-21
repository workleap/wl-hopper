import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { CalloutProps } from "./Callout.tsx";

export const CalloutContext = createContext<ContextValue<CalloutProps, HTMLDivElement>>({});

CalloutContext.displayName = "CalloutContext";
