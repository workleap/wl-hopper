import { createContext } from "react";

import type { MenuTriggerProps } from "./MenuTrigger.tsx";

export const InternalMenuTriggerContext = createContext<Omit<MenuTriggerProps, "children">>({});
