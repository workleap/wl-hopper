import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { HeadingProps } from "./Heading.tsx";

export const HeadingContext = createContext<ContextValue<HeadingProps, HTMLHeadingElement>>({});

HeadingContext.displayName = "HeadingContext";
