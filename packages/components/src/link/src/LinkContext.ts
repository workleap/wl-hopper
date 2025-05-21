import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { LinkProps } from "./Link.tsx";

export const LinkContext = createContext<ContextValue<LinkProps, HTMLAnchorElement>>({});

LinkContext.displayName = "LinkContext";
