import { IconContext } from "@hopper-ui/icons";
import { type StyledComponentProps, useIsomorphicLayoutEffect, useMediaQuery, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, type MutableRefObject, type ReactNode, useContext, useRef } from "react";
import { Provider, Tab as RACTab, type TabProps as RACTabProps, useContextProps } from "react-aria-components";

import { BadgeContext } from "../../badge/index.ts";
import { TagContext } from "../../tag/index.ts";
import { Text, TextContext } from "../../typography/index.ts";
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
    const { size, isFluid, prevRef, tablistRef } = useContext(InternalTabsContext) ?? {};

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
            {({ isSelected, isDisabled }) => (
                <Provider
                    values={[
                        [TextContext, {
                            className: styles["hop-Tab__text"],
                            size,
                            fontWeight: size === "sm" ? "body-sm-medium" : "body-md-medium"
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
                    <TabInner
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        prevRef={prevRef}
                        tablistRef={tablistRef}
                    >
                        {typeof children === "string" ? <Text>{children}</Text> : children}
                    </TabInner>
                </Provider>
            )}
        </RACTab>
    );
}

function TabInner({ isSelected, isDisabled, children, prevRef, tablistRef }: {
    isSelected: boolean;
    isDisabled: boolean;
    children: ReactNode;
    prevRef?: MutableRefObject<DOMRect | null>;
    tablistRef?: MutableRefObject<HTMLDivElement | null>;
}) {
    const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const ref = useRef<HTMLDivElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        if (isSelected && prevRef?.current && tablistRef?.current && ref?.current && !reduceMotion) {
            const currentItem = ref?.current.getBoundingClientRect();

            const deltaX = prevRef.current.left - currentItem.left;
            ref.current.animate(
                [
                    { transform: `translateX(${deltaX}px)`, inlineSize: `${prevRef.current.width}px` },
                    { transform: "translateX(0px)", inlineSize: "100%" }
                ],
                {
                    duration: 150,
                    easing: "ease-in-out"
                }
            );

            prevRef.current = null;
        }
    }, [isSelected, reduceMotion, prevRef, tablistRef]);

    return (
        <>
            {isSelected && (
                <div ref={ref} className={cssModule(styles, "hop-Tab__selector", isDisabled && "disabled")} >
                    <div className={styles["hop-Tab__selector--inner"]} />
                </div>
            )}
            {children}
        </>
    );
}

/**
 * [View Documentation](https://hopper.workleap.design/components/Tabs)
 */
const _Tab = forwardRef<HTMLDivElement, TabProps>(Tab);
_Tab.displayName = "Tab";

export { _Tab as Tab };
