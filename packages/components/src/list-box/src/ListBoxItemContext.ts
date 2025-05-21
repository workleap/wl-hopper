import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ListBoxItemProps } from "./ListBoxItem.tsx";

export const ListBoxItemContext = createContext<ContextValue<ListBoxItemProps<object>, HTMLElement>>({});

ListBoxItemContext.displayName = "ListBoxItemContext";
