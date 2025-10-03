import { createContext } from "react";
import type { ContextValue, DateValue } from "react-aria-components";

import type { DateRangePickerProps } from "./DateRangePicker.tsx";

export const DateRangePickerContext = createContext<ContextValue<Partial<DateRangePickerProps<DateValue>>, HTMLDivElement>>({});

DateRangePickerContext.displayName = "DateRangePickerContext";
