import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { TileProps } from "./Tile.tsx";

export const TileContext = createContext<ContextValue<TileProps, HTMLButtonElement>>({});

TileContext.displayName = "TileContext";

export const InternalTileContext = createContext<ContextValue<Omit<TileProps, "id">, HTMLButtonElement>>({});
