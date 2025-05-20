import { slot as slotFn, useStyledSystem, type StyledSystemProps } from "@hopper-ui/styled-system";
import { filterDOMProps } from "@react-aria/utils";
import { forwardRef, type ForwardedRef } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { OverlineText } from "../../typography/OverlineText/index.ts";
import { ClearContainerSlots, composeClassnameRenderProps, cssModule, useRenderProps, type AccessibleSlotProps, type RenderProps } from "../../utils/index.ts";
import { mapOrbiterToHopperVariants } from "../utils/Badge.utils.ts";

import { BadgeContext, type BadgeContextValue } from "./BadgeContext.ts";

import styles from "./Badge.module.css";

export const GlobalBadgeCssSelector = "hop-Badge";
export type BadgeVariant = "primary" | "secondary" | "subdued";

interface BadgeRenderProps {
    /**
     * Whether or not the badge is disabled.
     */
    isDisabled?: boolean;
    /**
     * Whether or not the badge is indeterminate and should just be a dot. This will ignore any children.
    */
    isIndeterminate?: boolean;
    /**
     * Whether or not the badge is hovered.
     */
    isHovered?: boolean;
    /**
     * Whether or not the badge is pressed.
     */
    isPressed?: boolean;
    /**
     * Whether or not the badge is selected.
     */
    isSelected?: boolean;
    /**
    * The visual style of the badge.
    * @default "primary"
    */
    variant?: BadgeVariant;
}

export interface BadgeProps extends StyledSystemProps, AccessibleSlotProps, RenderProps<BadgeRenderProps> {
    /**
     * The visual style of the badge.
     * @default "primary"
     */
    variant?: BadgeVariant;
    /**
     * Whether or not the badge is disabled.
     */
    isDisabled?: boolean;
    /**
     * Whether or not the badge is indeterminate and should just be a dot. This will ignore any children.
    */
    isIndeterminate?: boolean;
}

function Badge(props: BadgeProps, ref: ForwardedRef<HTMLSpanElement>) {
    [props, ref] = useContextProps(props, ref, BadgeContext);
    const { isHovered, isPressed, isSelected } = props as BadgeContextValue;

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        isDisabled,
        isIndeterminate,
        style,
        slot,
        variant = "primary",
        ...otherProps
    } = ownProps;


    const classNames = composeClassnameRenderProps(
        className,
        GlobalBadgeCssSelector,
        cssModule(
            styles,
            "hop-Badge",
            mapOrbiterToHopperVariants(variant)
        ),
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps<BadgeRenderProps>({
        ...props,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false,
            isIndeterminate: isIndeterminate || false,
            isHovered: isHovered || false,
            isPressed: isPressed || false,
            isSelected: isSelected || false,
            variant: mapOrbiterToHopperVariants(variant)
        }
    });

    const isDot = isIndeterminate || !renderProps.children;
    const filteredProps = filterDOMProps(otherProps, { labelable: true });

    return (
        <ClearContainerSlots>
            <OverlineText
                {...mergeProps(filteredProps, renderProps)}
                ref={ref}
                slot={slot ?? undefined}
                data-disabled={isDisabled || undefined}
                aria-disabled={isDisabled || undefined}
                data-indeterminate={isDot || undefined}
                data-hovered={isHovered || undefined}
                data-pressed={isPressed || undefined}
                data-selected={isSelected || undefined}
            >
                {!isDot && renderProps.children}
            </OverlineText>
        </ClearContainerSlots>
    );
}

/**
 * A badge displays either a number, text or a dot to indicate the status of an element.
 *
 * [View Documentation](https://hopper.workleap.design/components/Badge)
 */
const _Badge = slotFn("badge", forwardRef<HTMLSpanElement, BadgeProps>(Badge));
_Badge.displayName = "Badge";

export { _Badge as Badge };
