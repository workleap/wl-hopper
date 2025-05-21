import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { SegmentedControlItemProps } from "./SegmentedControlItem.tsx";

interface InternalSegmentedControlItemProps extends Omit<SegmentedControlItemProps, "id"> {}

export const SegmentedControlItemContext = createContext<ContextValue<InternalSegmentedControlItemProps, HTMLButtonElement>>({});

SegmentedControlItemContext.displayName = "SegmentedControlItemContext";
