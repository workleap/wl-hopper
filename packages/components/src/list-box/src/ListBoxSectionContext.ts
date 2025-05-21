import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ListBoxSectionProps } from "./ListBoxSection.tsx";

// any is what's used in RAC
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListBoxSectionContext = createContext<ContextValue<ListBoxSectionProps<any>, HTMLElement>>({});

ListBoxSectionContext.displayName = "ListBoxSectionContext";
