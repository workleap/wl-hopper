import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { IllustratedMessageProps } from "./IllustratedMessage.tsx";

export const IllustratedMessageContext = createContext<ContextValue<IllustratedMessageProps, HTMLDivElement>>({});

IllustratedMessageContext.displayName = "IllustratedMessageContext";
