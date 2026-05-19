import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ChipGroupProps } from "./ChipGroup.tsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChipGroupContext = createContext<ContextValue<ChipGroupProps<any>, HTMLDivElement>>({});
export const InternalChipGroupContext = createContext<{
    isInGroup: boolean;
}>({ isInGroup: false });

ChipGroupContext.displayName = "ChipGroupContext";
