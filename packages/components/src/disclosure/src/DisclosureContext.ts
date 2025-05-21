import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { DisclosureProps } from "./Disclosure.tsx";

export const DisclosureContext = createContext<ContextValue<DisclosureProps, HTMLDivElement>>({});

DisclosureContext.displayName = "DisclosureContext";
