import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { AccordionProps } from "./Accordion.tsx";

export const AccordionContext = createContext<ContextValue<AccordionProps, HTMLDivElement>>({});

AccordionContext.displayName = "AccordionContext";
