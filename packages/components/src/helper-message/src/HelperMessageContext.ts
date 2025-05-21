import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { HelperMessageProps } from "./HelperMessage.tsx";

export const HelperMessageContext = createContext<ContextValue<HelperMessageProps, HTMLSpanElement>>({});

HelperMessageContext.displayName = "HelperMessageContext";
