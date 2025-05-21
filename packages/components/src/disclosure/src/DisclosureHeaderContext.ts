import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { DisclosureHeaderProps } from "./DisclosureHeader.tsx";

export const DisclosureHeaderContext = createContext<ContextValue<DisclosureHeaderProps, HTMLHeadingElement>>({});

DisclosureHeaderContext.displayName = "DisclosureHeaderContext";
