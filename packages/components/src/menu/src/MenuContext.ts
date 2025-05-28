import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { MenuProps } from "./Menu.tsx";

export const MenuContext = createContext<ContextValue<MenuProps<unknown>, HTMLDivElement>>({});

MenuContext.displayName = "MenuContext";

interface InternalMenuContextProps {
    isSubmenu: boolean;
}

export const InternalMenuContext = createContext<InternalMenuContextProps>({
    isSubmenu: false
});
