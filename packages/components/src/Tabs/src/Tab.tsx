import { IconContext } from "@hopper-ui/icons";
import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, useContext } from "react";
import { type TabProps as RACTabProps, Provider, Tab as RACTab, useContextProps } from "react-aria-components";

import { BadgeContext } from "../../Badge/index.ts";
import { TagContext } from "../../tag/index.ts";
import { Text, TextContext } from "../../typography/Text/index.ts";
import { type BaseComponentDOMProps, cssModule } from "../../utils/index.ts";

import { InternalTabsContext, TabContext } from "./TabsContext.ts";

import styles from "./Tab.module.css";

export const GlobalTabCssSelector = "hop-Tab";

export interface TabProps extends
    Omit<RACTabProps, "id" | "children" | "className" | "style">,
    StyledComponentProps<BaseComponentDOMProps> {}

function Tab(props: TabProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TabContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { variant, size, isFluid } = useContext(InternalTabsContext) ?? {};

    const {
        className,
        children,
        style,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalTabCssSelector,
        cssModule(
            styles,
            "hop-Tab",
            variant,
            size,
            isFluid && "fluid"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <RACTab
            {...otherProps}
            style={mergedStyles}
            className={classNames}
            ref={ref}
        >
            <Provider
                values={[
                    [TextContext, {
                        className: styles["hop-Tab__text"],
                        size
                    }],
                    [IconContext, {
                        className: styles["hop-Tab__icon"],
                        size
                    }],
                    [BadgeContext, {
                        className: styles["hop-Tab__badge"]
                    }],
                    [TagContext, {
                        className: styles["hop-Tab__tag"],
                        size
                    }]
                ]}
            >
                {typeof children === "string" ? <Text>{children}</Text> : children}
            </Provider>
        </RACTab>
    );
}

/**
 * [View Documentation](https://hopper.workleap.design/components/Tabs)
 */
const _Tab = forwardRef<HTMLDivElement, TabProps>(Tab);
_Tab.displayName = "Tab";

export { _Tab as Tab };
