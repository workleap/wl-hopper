import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { DisclosurePanelProps } from "./DisclosurePanel.tsx";

export const DisclosurePanelContext = createContext<ContextValue<Partial<DisclosurePanelProps>, HTMLDivElement>>({});

DisclosurePanelContext.displayName = "DisclosurePanelContext";
