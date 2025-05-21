import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { TileGroupProps } from "./TileGroup.tsx";

export const TileGroupContext = createContext<ContextValue<TileGroupProps, HTMLDivElement>>({});

TileGroupContext.displayName = "TileGroupContext";
