import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ToggleArrowProps } from "./ToggleArrow.tsx";

export const ToggleArrowContext = createContext<ContextValue<ToggleArrowProps, SVGSVGElement>>({});

ToggleArrowContext.displayName = "ToggleArrowContext";
