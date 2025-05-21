import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ListBoxProps } from "./ListBox.tsx";

// any is what's used in RAC
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListBoxContext = createContext<ContextValue<ListBoxProps<any>, HTMLDivElement>>({});

ListBoxContext.displayName = "ListBoxContext";
