import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { CalendarProps } from "./Calendar.tsx";

export const CalendarContext = createContext<ContextValue<Partial<CalendarProps>, HTMLDivElement>>({});

CalendarContext.displayName = "CalendarContext";
