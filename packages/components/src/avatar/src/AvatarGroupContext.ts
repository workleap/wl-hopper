import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { AvatarGroupProps } from "./AvatarGroup.tsx";

export const AvatarGroupContext = createContext<ContextValue<AvatarGroupProps, HTMLDivElement>>({});

AvatarGroupContext.displayName = "AvatarGroupContext";
