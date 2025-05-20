import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { RichIconAvatarImageProps } from "./RichIconAvatarImage.tsx";

export const RichIconAvatarImageContext = createContext<ContextValue<RichIconAvatarImageProps, HTMLDivElement>>({});

RichIconAvatarImageContext.displayName = "RichIconAvatarImageContext";
