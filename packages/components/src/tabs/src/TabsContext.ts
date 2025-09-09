import { createContext, type MutableRefObject } from "react";
import type { ContextValue, Key, TabProps } from "react-aria-components";

import type { TabListProps } from "./TabList.tsx";
import type { TabPanelProps } from "./TabPanel.tsx";
import type { TabsProps } from "./Tabs.tsx";

export const TabsContext = createContext<ContextValue<Partial<TabsProps>, HTMLDivElement>>({});

TabsContext.displayName = "TabsContext";

export const TabContext = createContext<ContextValue<Partial<TabProps>, HTMLDivElement>>({});

TabContext.displayName = "TabContext";

export const TabPanelContext = createContext<ContextValue<Partial<TabPanelProps>, HTMLDivElement>>({});

TabPanelContext.displayName = "TabPanelContext";

export const TabListContext = createContext<ContextValue<Partial<TabListProps<object>>, HTMLDivElement>>({});

TabListContext.displayName = "TabListContext";

export const InternalTabsContext = createContext<Partial<TabsProps>& {
    tablistRef?: MutableRefObject<HTMLDivElement | null>;
    prevRef?: MutableRefObject<DOMRect | null>;
    selectedKey?: Key | null;
}>({});
