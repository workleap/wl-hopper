import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ModalProps } from "./Modal.tsx";

export const ModalContext = createContext<ContextValue<ModalProps, HTMLDivElement>>({});

ModalContext.displayName = "ModalContext";
