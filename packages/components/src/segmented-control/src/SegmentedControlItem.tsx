import { IconContext } from "@hopper-ui/icons";
import { useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useContext, useLayoutEffect, type CSSProperties, type ForwardedRef, type RefObject } from "react";
import { DEFAULT_SLOT, Provider, ToggleButton, ToggleGroupStateContext, useContextProps, type Key } from "react-aria-components";

import { Text, TextContext } from "../../typography/index.ts";
import { cssModule, type BaseComponentDOMProps } from "../../utils/index.ts";

import { InternalSegmentedControlContext } from "./SegmentedControlContext.ts";
import { SegmentedControlItemContext } from "./SegmentedControlItemContext.ts";

import styles from "./SegmentedControlItem.module.css";

export const GlobalSegmentedControlItemCssSelector = "hop-SegmentedControlItem";

export type SegmentedControlItemSize = "sm" | "md";

export interface SegmentedControlItemProps extends Omit<StyledComponentProps<BaseComponentDOMProps>, "id"> {
    /**
     * The id of the item, matching the value used in SegmentedControl's `selectedKey` prop.
     */
    id: Key;
    /**
     * Whether the item is disabled or not.
     */
    isDisabled?: boolean;
    /**
     * The size of the item.
     * * @default "sm"
     */
    size?: ResponsiveProp<SegmentedControlItemSize>;
}

const SegmentedControlItem = (props: SegmentedControlItemProps, ref: ForwardedRef<HTMLButtonElement>) => {
    [props, ref] = useContextProps(props, ref, SegmentedControlItemContext);
    const { prevRef, currentSelectedRef, isJustified } = useContext(InternalSegmentedControlContext);
    const state = useContext(ToggleGroupStateContext);
    const itemSelected = state?.selectedKeys.has(props.id);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        slot,
        size = "sm",
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalSegmentedControlItemCssSelector,
        cssModule(
            styles,
            "hop-SegmentedControlItem",
            size,
            isJustified && "justified"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const isReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    useLayoutEffect(() => {
        if (isReduced || !itemSelected || !prevRef?.current || !currentSelectedRef?.current) {
            return;
        }

        const prevSlider = prevRef.current;
        const currentSlider = currentSelectedRef.current;

        const currentItem = currentSlider.getBoundingClientRect();

        const deltaX = prevSlider.left - currentItem?.left;

        currentSelectedRef.current.animate(
            [
                { transform: `translateX(${deltaX}px)`, width: `${prevSlider.width}px` },
                { transform: "translateX(0px)", width: `${currentItem.width}px` }
            ],
            {
                duration: 200,
                easing: "ease-out"
            }
        );

        prevRef.current = null;
    }, [currentSelectedRef, isReduced, itemSelected, prevRef]);

    return (
        <ToggleButton
            {...otherProps}
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
        >
            {({ isSelected, isDisabled }) => (
                <>
                    {isSelected && !isDisabled && <div className={styles["hop-SegmentedControlItem__slider"]} ref={currentSelectedRef as RefObject<HTMLDivElement>} />}
                    <Provider
                        values={[
                            [IconContext, {
                                slots: {
                                    [DEFAULT_SLOT]: {
                                        className: styles["hop-SegmentedControlItem__icon"],
                                        size
                                    },
                                    "start-icon": {
                                        className: styles["hop-SegmentedControlItem__start-icon"],
                                        size
                                    }
                                }
                            }],
                            [TextContext, {
                                size: "sm",
                                className: styles["hop-SegmentedControlItem__text"]
                            }]
                        ]}
                    >
                        <div className={styles["hop-SegmentedControlItem__wrapper"]} >
                            {typeof children === "string" ? <Text>{children}</Text> : children}
                        </div>
                    </Provider>
                </>
            )}

        </ToggleButton>
    );
};

/**
 * A SegmentedControlItem represents an option within a SegmentedControl.
 *
 * [View Documentation](https://hopper.workleap.design/components/SegmentedControl)
 */
const _SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(SegmentedControlItem);
_SegmentedControlItem.displayName = "SegmentedControlItem";

export { _SegmentedControlItem as SegmentedControlItem };

