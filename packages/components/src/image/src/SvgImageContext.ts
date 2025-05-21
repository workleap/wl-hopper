import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { SvgImageProps } from "./SvgImage.tsx";

export const SvgImageContext = createContext<ContextValue<SvgImageProps, SVGSVGElement>>({});

SvgImageContext.displayName = "SvgImageContext";
