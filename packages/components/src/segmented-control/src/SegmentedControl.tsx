import { useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useContext, useEffect, useRef, type CSSProperties, type ForwardedRef } from "react";
import { Provider, ToggleButtonGroup, ToggleGroupStateContext, useContextProps, type Key } from "react-aria-components";

import { cssModule, type BaseComponentDOMProps } from "../../utils/index.ts";

import { InternalSegmentedControlContext, SegmentedControlContext } from "./SegmentedControlContext.ts";
import type { SegmentedControlItemSize } from "./SegmentedControlItem.tsx";
import { SegmentedControlItemContext } from "./SegmentedControlItemContext.ts";

import styles from "./SegmentedControl.module.css";

export const GlobalSegmentedControlCssSelector = "hop-SegmentedControl";

export interface SegmentedControlProps extends StyledComponentProps<BaseComponentDOMProps> {
    /**
    *  Whether the segmented control is disabled.
    */
    isDisabled?: boolean;
    /**
     * Whether the items should divide the container width equally.
     */
    isJustified?: boolean;
    /**
     * The id of the currently selected item (controlled).
     */
    selectedKey?: Key;
    /**
     * The id of the initial selected item (uncontrolled).
     */
    defaultSelectedKey?: Key;
    /**
     * Handler that is called when the selection changes.
     */
    onSelectionChange?: (id: Key) => void;
    /**
     * The size of the controls.
     * * @default "sm"
     */
    size?: ResponsiveProp<SegmentedControlItemSize>;
}

const SegmentedControl = (props: SegmentedControlProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, SegmentedControlContext);
    const state = useContext(ToggleGroupStateContext);

    const prevRef = useRef<DOMRect | null>(null);
    const currentSelectedRef = useRef<HTMLDivElement>(null);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        slot,
        defaultSelectedKey,
        selectedKey,
        onSelectionChange,
        size,
        isJustified,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalSegmentedControlCssSelector,
        cssModule(
            styles,
            "hop-SegmentedControl"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const onChange = (values: Set<Key>) => {
        const [firstKey] = values;

        if (!firstKey) {
            return;
        }

        if (currentSelectedRef.current) {
            prevRef.current = currentSelectedRef.current.getBoundingClientRect();
        }

        onSelectionChange?.(firstKey);
    };

    useEffect(() => {
        const key = defaultSelectedKey ?? selectedKey;

        if (key) {
            state?.toggleKey(key);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ToggleButtonGroup
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
            orientation="horizontal"
            onSelectionChange={onChange}
            selectedKeys={selectedKey != null ? [selectedKey] : undefined}
            defaultSelectedKeys={defaultSelectedKey != null ? [defaultSelectedKey] : undefined}
            disallowEmptySelection
            {...otherProps}
        >
            <Provider
                values={[
                    [SegmentedControlItemContext, { size, isDisabled: otherProps.isDisabled }],
                    [InternalSegmentedControlContext, { prevRef, currentSelectedRef, isJustified }]
                ]}
            >
                {children}
            </Provider>
        </ToggleButtonGroup>
    );
};

/**
 * Segmented control displays multiple contextually or conceptually related action or option stacked in a horizontal row.
 *
 * [View Documentation](https://hopper.workleap.design/components/SegmentedControl)
 */
const _SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(SegmentedControl);
_SegmentedControl.displayName = "SegmentedControl";

export { _SegmentedControl as SegmentedControl };
