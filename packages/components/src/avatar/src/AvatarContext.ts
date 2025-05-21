import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { AvatarProps } from "./Avatar.tsx";

export const AvatarContext = createContext<ContextValue<Partial<AvatarProps>, HTMLDivElement>>({});

AvatarContext.displayName = "AvatarContext";
