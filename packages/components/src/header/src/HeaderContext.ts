import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { HeaderProps } from "./Header.tsx";

export const HeaderContext = createContext<ContextValue<HeaderProps, HTMLElement>>({});

HeaderContext.displayName = "HeaderContext";
