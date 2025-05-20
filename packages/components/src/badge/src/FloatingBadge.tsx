import { useStyledSystem, type ResponsiveProp, type StyledSystemProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { ClearContainerSlots, cssModule, SlotProvider, type BaseComponentDOMProps } from "../../utils/index.ts";

import { BadgeContext } from "./BadgeContext.ts";
import { FloatingBadgeContext } from "./FloatingBadgeContext.ts";

import styles from "./FloatingBadge.module.css";

export const GlobalFloatingBadgeCssSelector = "hop-FloatingBadge";

export type FloatingBadgePlacement = "top right" | "bottom right" | "bottom left" | "top left";
export type FloatingBadgeOverlap = "circular" | "rectangular";

export interface FloatingBadgeProps extends StyledSystemProps, BaseComponentDOMProps {
    /**
     * The offset of the badge from the anchor component. [horizontal, vertical]
     */
    offset?: [number | string, number | string];
    /**
     * The wrapped shape that the badge should overlap.
     * @default "rectangular"
     */
    overlap?: FloatingBadgeOverlap;
    /**
     * The placement of the badge relative to the anchor component.
     * @default "top right"
     */
    placement?: ResponsiveProp<FloatingBadgePlacement>;
}

interface FloatingBadgeCSSProperties extends CSSProperties {
    "--hop-FloatingBadge-offset-x": number | string;
    "--hop-FloatingBadge-offset-y": number | string;
}

function FloatingBadge(props: FloatingBadgeProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, FloatingBadgeContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        children,
        className,
        offset = [0, 0],
        overlap = "rectangular",
        placement = "top right",
        style,
        slot,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        className,
        GlobalFloatingBadgeCssSelector,
        cssModule(
            styles,
            "hop-FloatingBadge"
        ),
        stylingProps.className
    );

    const offsetXValue = typeof offset[0] === "string" ? offset[0] : `${offset[0]}px`;
    const offsetYValue = typeof offset[1] === "string" ? offset[1] : `${offset[1]}px`;

    const mergedStyles: FloatingBadgeCSSProperties = {
        ...stylingProps.style,
        ...style,
        "--hop-FloatingBadge-offset-x": offsetXValue,
        "--hop-FloatingBadge-offset-y": offsetYValue
    };

    return (
        <ClearContainerSlots>
            <SlotProvider
                values={[
                    [BadgeContext, {
                        className: styles["hop-FloatingBadge__badge"]
                    }]
                ]}
            >
                <div
                    ref={ref}
                    className={classNames}
                    style={mergedStyles}
                    slot={slot ?? undefined}
                    data-overlap={overlap}
                    data-placement={placement}
                    {...otherProps}
                >
                    {children}
                </div>
            </SlotProvider>
        </ClearContainerSlots>
    );
}

/**
 * A floating badge serves to present notices or notifications associated with a parent component.
 *
 * [View Documentation](https://hopper.workleap.design/components/FloatingBadge)
 */
const _FloatingBadge = forwardRef<HTMLDivElement, FloatingBadgeProps>(FloatingBadge);
_FloatingBadge.displayName = "FloatingBadge";

export { _FloatingBadge as FloatingBadge };
