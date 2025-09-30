import { createContext } from "react";
import type { ContextValue, DateValue } from "react-aria-components";

import type { RangeCalendarProps } from "./RangeCalendar.tsx";

export const RangeCalendarContext = createContext<ContextValue<Partial<RangeCalendarProps<DateValue>>, HTMLDivElement>>({});

RangeCalendarContext.displayName = "RangeCalendarContext";
