import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { IconListProps } from "./IconList.tsx";

export const IconListContext = createContext<ContextValue<IconListProps, HTMLSpanElement>>({});

IconListContext.displayName = "IconListContext";
