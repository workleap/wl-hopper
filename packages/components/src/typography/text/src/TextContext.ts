import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { TextProps } from "./Text.tsx";

export const TextContext = createContext<ContextValue<TextProps, HTMLSpanElement>>({});

TextContext.displayName = "TextContext";
