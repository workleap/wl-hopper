import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { BaseModalProps } from "./BaseModal.tsx";

export const BaseModalContext = createContext<ContextValue<BaseModalProps, HTMLDivElement>>({});

BaseModalContext.displayName = "BaseModalContext";
