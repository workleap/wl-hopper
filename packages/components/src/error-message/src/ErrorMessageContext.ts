import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ErrorMessageProps } from "./ErrorMessage.tsx";

export const ErrorMessageContext = createContext<ContextValue<ErrorMessageProps, HTMLSpanElement>>({});

ErrorMessageContext.displayName = "ErrorMessageContext";
