import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { CalendarProps } from "./Calendar.tsx";

// any is what's used in RAC
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CalendarContext = createContext<ContextValue<Partial<CalendarProps<any>>, HTMLDivElement>>({});

CalendarContext.displayName = "CalendarContext";
