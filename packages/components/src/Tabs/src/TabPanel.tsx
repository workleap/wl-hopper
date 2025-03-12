import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { type TabPanelProps as RACTabPanelProps, TabPanel as RACTabPanel, useContextProps } from "react-aria-components";

import type { BaseComponentDOMProps } from "../../utils/index.ts";

import { TabPanelContext } from "./TabsContext.ts";

export const GlobalTabPanelCssSelector = "hop-TabPanel";

export interface TabPanelProps extends
    Omit<RACTabPanelProps, "id" | "children" | "className" | "style">,
    StyledComponentProps<BaseComponentDOMProps> {}

function TabPanel(props: TabPanelProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TabPanelContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        style,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalTabPanelCssSelector,
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <RACTabPanel
            ref={ref}
            style={mergedStyles}
            className={classNames}
            {...otherProps}
        />
    );
}

/**
 * [View Documentation](https://hopper.workleap.design/components/Tabs)
 */
const _TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(TabPanel);
_TabPanel.displayName = "TabPanel";

export { _TabPanel as TabPanel };
