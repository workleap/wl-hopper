import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { RangeCalendarProps } from "./RangeCalendar.tsx";

export const RangeCalendarContext = createContext<ContextValue<Partial<RangeCalendarProps>, HTMLDivElement>>({});

RangeCalendarContext.displayName = "RangeCalendarContext";
