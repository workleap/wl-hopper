import { createContext } from "react";
import type { ContextValue, DateValue } from "react-aria-components";

import type { CalendarProps } from "./Calendar.tsx";

export const CalendarContext = createContext<ContextValue<Partial<CalendarProps<DateValue>>, HTMLDivElement>>({});

CalendarContext.displayName = "CalendarContext";
