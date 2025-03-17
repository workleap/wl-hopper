import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { TagGroupProps } from "./TagGroup.tsx";

// any is used in spectrum
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TagGroupContext = createContext<ContextValue<TagGroupProps<any>, HTMLDivElement>>({});
export const InternalTagGroupContext = createContext<{
    isInGroup: boolean;
}>({ isInGroup: false });

TagGroupContext.displayName = "TagGroupContext";
