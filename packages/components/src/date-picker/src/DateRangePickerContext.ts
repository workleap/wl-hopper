import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { DateRangePickerProps } from "./DateRangePicker.tsx";

export const DateRangePickerContext = createContext<ContextValue<Partial<DateRangePickerProps>, HTMLDivElement>>({});

DateRangePickerContext.displayName = "DateRangePickerContext";
