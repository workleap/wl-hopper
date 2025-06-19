import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useContext, useLayoutEffect, useRef, useState, type CSSProperties, type ForwardedRef } from "react";
import { TabList as RACTablist, TabListStateContext, useContextProps, type TabListProps as RACTablistProps } from "react-aria-components";

import { cssModule, type BaseComponentDOMProps } from "../../utils/index.ts";

import { TabLine } from "./TabLine.tsx";
import { InternalTabsContext, TabListContext } from "./TabsContext.ts";

import styles from "./TabList.module.css";

export const GlobalTabListCssSelector = "hop-TabList";

export interface TabListProps<T> extends
    Omit<RACTablistProps<T>, "children" | "className" | "style">,
    StyledComponentProps<BaseComponentDOMProps> {}

function TabList<T extends object>(props: TabListProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TabListContext);
    const { variant, isDisabled, disabledKeys, size } = useContext(InternalTabsContext) ?? {};
    const state = useContext(TabListStateContext);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [selectedTab, setSelectedTab] = useState<HTMLElement | undefined>(undefined);

    const { stylingProps, ...ownProps } = useStyledSystem(props);

    useLayoutEffect(() => {
        if (ref?.current) {
            const tab: HTMLElement | null = ref.current.querySelector("[role=tab][data-selected=true]");

            if (tab != null) {
                setSelectedTab(tab);
            }
        }
    }, [ref, state?.selectedItem?.key]);

    const {
        className,
        style,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalTabListCssSelector,
        cssModule(
            styles,
            "hop-TabList",
            variant,
            size
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <div className={classNames} style={mergedStyles} ref={wrapperRef}>
            <RACTablist
                {...otherProps}
                ref={ref}
                className={styles["hop-TabList__tablist"]}
            />
            <TabLine wrapperElement={wrapperRef.current} selectedTab={selectedTab} isDisabled={isDisabled} disabledKeys={disabledKeys} />
        </div>
    );
}


/**
 * Tabs are used to organize related content. They allow the user to navigate between groups of information that appear within the same context.
 *
 * [View Documentation](https://hopper.workleap.design/components/Tabs)
 */
const _TabList = forwardRef<HTMLDivElement, TabListProps<object>>(TabList);
_TabList.displayName = "TabList";

export { _TabList as TabList };
