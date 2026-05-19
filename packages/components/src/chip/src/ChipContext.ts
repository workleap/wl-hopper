import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ChipProps } from "./Chip.tsx";

export const ChipContext = createContext<ContextValue<ChipProps, HTMLDivElement>>({});

ChipContext.displayName = "ChipContext";
