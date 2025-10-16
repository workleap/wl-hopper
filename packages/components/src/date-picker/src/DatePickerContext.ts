import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { DatePickerProps } from "./DatePicker.tsx";

export const DatePickerContext = createContext<ContextValue<Partial<DatePickerProps>, HTMLDivElement>>({});

DatePickerContext.displayName = "DatePickerContext";
