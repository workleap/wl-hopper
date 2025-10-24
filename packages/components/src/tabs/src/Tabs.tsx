import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, useCallback, useRef } from "react";
import {
    type Key,
    type TabsProps as RACTabsProps,
    Provider,
    Tabs as RACTabs,
    useContextProps
} from "react-aria-components";

import type { BaseComponentDOMProps } from "../../utils/index.ts";

import { InternalTabsContext, TabsContext } from "./TabsContext.ts";

export const GlobalTabsCssSelector = "hop-Tabs";

export interface TabsProps extends Omit<RACTabsProps, "id" | "children" | "style" | "className" | "orientation">, StyledComponentProps<BaseComponentDOMProps> {
    /**
     * The variant of the tabs.
     * @default "standalone"
     */
    variant?: "standalone" | "in-card" | "heading";
    /**
     * The size of the tabs.
     * @default "sm"
     */
    size?: "sm" | "md";
    /**
     * Whether or not the tabs takes up the width of its container.
     */
    isFluid?: boolean;
}

function Tabs(props: TabsProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TabsContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        children,
        style,
        slot,
        isDisabled,
        disabledKeys,
        variant = "standalone",
        size = "sm",
        isFluid,
        ...otherProps
    } = ownProps;

    const [value, setValue] = useControlledState(props.selectedKey, props.defaultSelectedKey ?? null!, props.onSelectionChange);

    const tablistRef = useRef<HTMLDivElement | null>(null);
    const prevRef = useRef<DOMRect | null>(null);

    const onChange = useCallback((val: Key) => {
        if (tablistRef.current) {
            prevRef.current = tablistRef.current.querySelector("[role=tab][data-selected=true]")?.getBoundingClientRect() ?? null;
        }
        setValue(val);
    }, [setValue]);

    if (!props["aria-label"] && !props["aria-labelledby"]) {
        console.warn("An aria-label or aria-labelledby prop is required on Tabs for accessibility.");
    }

    const classNames = clsx(
        GlobalTabsCssSelector,
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <RACTabs
            ref={ref}
            slot={slot}
            className={classNames}
            style={mergedStyles}
            isDisabled={isDisabled}
            disabledKeys={disabledKeys}
            onSelectionChange={onChange}
            {...otherProps}
        >
            <Provider
                values={[
                    [InternalTabsContext, {
                        variant,
                        size,
                        selectedKey: value,
                        isFluid,
                        isDisabled,
                        disabledKeys,
                        "aria-label": props["aria-label"],
                        "aria-labelledby": props["aria-labelledby"],
                        tablistRef,
                        prevRef,
                        onSelectionChange: onChange
                    }]
                ]}
            >
                {children}
            </Provider>
        </RACTabs>
    );
}

/**
 * Tabs are used to organize related content. They allow the user to navigate between groups of information that appear within the same context.
 *
 * [View Documentation](https://hopper.workleap.design/components/Tabs)
 */
const _Tabs = forwardRef<HTMLDivElement, TabsProps>(Tabs);
_Tabs.displayName = "Tabs";

export { _Tabs as Tabs };
