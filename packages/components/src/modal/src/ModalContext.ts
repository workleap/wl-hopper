import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ModalProps } from "./Modal.tsx";
import type { ModalTriggerProps } from "./ModalTrigger.tsx";

export const ModalContext = createContext<ContextValue<ModalProps, HTMLDivElement>>({});
ModalContext.displayName = "ModalContext";

export const InternalModalTriggerContext = createContext<Partial<ModalTriggerProps> | undefined>(undefined);
InternalModalTriggerContext.displayName = "InternalModalTriggerContext";
