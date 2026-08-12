import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, useContext, useRef } from "react";
import { TabList as RACTablist, type TabListProps as RACTablistProps } from "react-aria-components";

import { type BaseComponentDOMProps, cssModule } from "../../utils/index.ts";

import { InternalTabsContext } from "./TabsContext.ts";

import styles from "./TabList.module.css";

export const GlobalTabListCssSelector = "hop-TabList";

export interface TabListProps<T>
    extends Omit<RACTablistProps<T>, "children" | "className" | "style">, StyledComponentProps<BaseComponentDOMProps> {}

/**
 * Tabs are used to organize related content. They allow the user to navigate between groups of information that appear within the same context.
 *
 * [View Documentation](https://hopper.workleap.design/components/Tabs)
 */
function TabList(props: TabListProps<object>) {
    const { variant, size, tablistRef } = useContext(InternalTabsContext) ?? {};
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const { className, style, ...otherProps } = ownProps;

    const classNames = clsx(
        GlobalTabListCssSelector,
        cssModule(styles, "hop-TabList", variant, size),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <div className={classNames} style={mergedStyles} ref={wrapperRef}>
            <RACTablist {...otherProps} ref={tablistRef} className={styles["hop-TabList__tablist"]} />
        </div>
    );
}

export { TabList };
