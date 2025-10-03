import { createContext } from "react";
import type { ContextValue, DateValue } from "react-aria-components";

import type { DatePickerProps } from "./DatePicker.tsx";

export const DatePickerContext = createContext<ContextValue<Partial<DatePickerProps<DateValue>>, HTMLDivElement>>({});

DatePickerContext.displayName = "DatePickerContext";
