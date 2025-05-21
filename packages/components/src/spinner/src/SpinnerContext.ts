import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { SpinnerProps } from "./Spinner.tsx";

export const SpinnerContext = createContext<ContextValue<SpinnerProps, HTMLDivElement>>({});

SpinnerContext.displayName = "SpinnerContext";
