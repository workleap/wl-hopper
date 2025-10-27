import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { RichIconProps } from "./RichIcon.tsx";

export const RichIconContext = createContext<ContextValue<Omit<RichIconProps, "src24" | "src32" | "src40">, SVGSVGElement>>({});

RichIconContext.displayName = "RichIconContext";
