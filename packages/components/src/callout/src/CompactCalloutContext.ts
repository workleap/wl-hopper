import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { CompactCalloutProps } from "./CompactCallout.tsx";

export const CompactCalloutContext = createContext<ContextValue<CompactCalloutProps, HTMLDivElement>>({});

CompactCalloutContext.displayName = "CompactCalloutContext";
