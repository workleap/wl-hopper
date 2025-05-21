import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { SelectProps } from "./Select.tsx";
// any is what's used in RAC
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectContextProps = SelectProps<any>;

export const SelectContext = createContext<ContextValue<Partial<SelectContextProps>, HTMLDivElement>>({});

SelectContext.displayName = "SelectContext";
