import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { AlertProps } from "./Alert.tsx";

export const AlertContext = createContext<ContextValue<AlertProps, HTMLDivElement>>({});

AlertContext.displayName = "AlertContext";
