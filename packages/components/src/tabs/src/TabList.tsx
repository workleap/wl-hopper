import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useContext, useRef, type CSSProperties, type ForwardedRef } from "react";
import { TabList as RACTablist, useContextProps, type TabListProps as RACTablistProps } from "react-aria-components";

import { cssModule, type BaseComponentDOMProps } from "../../utils/index.ts";

import { InternalTabsContext, TabListContext } from "./TabsContext.ts";

import styles from "./TabList.module.css";

export const GlobalTabListCssSelector = "hop-TabList";

export interface TabListProps<T> extends
    Omit<RACTablistProps<T>, "children" | "className" | "style">,
    StyledComponentProps<BaseComponentDOMProps> {}

function TabList<T extends object>(props: TabListProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TabListContext);
    const { variant, size, tablistRef } = useContext(InternalTabsContext) ?? {};
    const wrapperRef = useRef<HTMLDivElement>(null);
    // const mergedRef = useObjectRef(mergeRefs(ref, tablistRef ?? null));

    const { stylingProps, ...ownProps } = useStyledSystem(props);

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
                ref={tablistRef}
                className={styles["hop-TabList__tablist"]}
            />
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
