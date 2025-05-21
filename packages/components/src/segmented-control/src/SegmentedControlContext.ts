import { createContext, type MutableRefObject, type RefObject } from "react";
import type { ContextValue } from "react-aria-components";

import type { SegmentedControlProps } from "./SegmentedControl.tsx";

export const SegmentedControlContext = createContext<ContextValue<SegmentedControlProps, HTMLDivElement>>({});

SegmentedControlContext.displayName = "SegmentedControlContext";

interface InternalSegmentedControlContextProps {
    prevRef?: MutableRefObject<DOMRect | null>;
    currentSelectedRef?: RefObject<HTMLDivElement | null>;
    isJustified?: boolean;
}

export const InternalSegmentedControlContext = createContext<InternalSegmentedControlContextProps>({});
