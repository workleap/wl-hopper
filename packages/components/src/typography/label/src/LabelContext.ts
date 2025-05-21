import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { LabelProps } from "./Label.tsx";

export const LabelContext = createContext<ContextValue<LabelProps, HTMLLabelElement>>({});

LabelContext.displayName = "LabelContext";
