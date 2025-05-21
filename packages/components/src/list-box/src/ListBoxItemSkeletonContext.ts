import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ListBoxItemSkeletonProps } from "./ListBoxItemSkeleton.tsx";

export const ListBoxItemSkeletonContext = createContext<ContextValue<ListBoxItemSkeletonProps, HTMLDivElement>>({});

ListBoxItemSkeletonContext.displayName = "ListBoxItemSkeletonContext";
