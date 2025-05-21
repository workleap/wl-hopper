import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ComboBoxProps } from "./ComboBox.tsx";
// any is what's used in RAC
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComboBoxContextProps = ComboBoxProps<any>;

export const ComboBoxContext = createContext<ContextValue<Partial<ComboBoxContextProps>, HTMLDivElement>>({});

ComboBoxContext.displayName = "ComboBoxContext";
