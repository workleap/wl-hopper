import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { CustomModalProps } from "./CustomModal.tsx";

export const CustomModalContext = createContext<ContextValue<CustomModalProps, HTMLDivElement>>({});

CustomModalContext.displayName = "CustomModalContext";
