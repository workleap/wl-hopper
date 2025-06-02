import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { MenuItemProps } from "./MenuItem.tsx";

export const MenuItemContext = createContext<ContextValue<Partial<MenuItemProps>, HTMLDivElement>>({});
