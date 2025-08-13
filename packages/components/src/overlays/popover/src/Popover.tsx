import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps, type StyledSystemProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type ForwardedRef } from "react";
import type { Placement } from "react-aria";
import {
    composeRenderProps,
    Dialog,
    Popover as RACPopover,
    useContextProps,
    type PopoverProps as RACPopoverProps
} from "react-aria-components";

import { ButtonContext, ButtonGroupContext, LinkButtonContext } from "../../../buttons/index.ts";
import { HopperProvider, useForwardedHopperContext } from "../../../hopper-provider/index.ts";
import { ContentContext, FooterContext } from "../../../layout/index.ts";
import { LinkContext } from "../../../link/index.ts";
import { ListBoxContext } from "../../../list-box/index.ts";
import { HeadingContext } from "../../../typography/index.ts";
import { composeClassnameRenderProps, cssModule, isFunction, isNil, SlotProvider, type BaseComponentDOMProps } from "../../../utils/index.ts";

import { PopoverContext } from "./PopoverContext.ts";

import styles from "./Popover.module.css";

export const GlobalPopoverCssSelector = "hop-Popover";
export type PopoverContainerProps = BaseComponentDOMProps & StyledSystemProps;

export interface PopoverProps extends StyledComponentProps<Omit<RACPopoverProps, "placement">> {
    /**
     * Whether the popover should have an auto width. Only available in non-dialog popovers.
     */
    isAutoWidth?: boolean;
    /**
     * The minimum distance the trigger edge should be from the edge of the overlay element.
     */
    boundaryOffset?: number;
    /**
     * Whether the popover is a non-dialog. This is set to true in components such as selects.
     */
    isNonDialog?: boolean;
    /**
     * The props of the popover's inner container.
     */
    containerProps?: PopoverContainerProps;
    /**
     * The placement of the popover with respect to its anchor element.
     * @default "bottom"
     */
    placement?: ResponsiveProp<Placement>;
}

function Popover(props: PopoverProps, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref, PopoverContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const prevContextProps = useForwardedHopperContext();
    const {
        isAutoWidth,
        children,
        className,
        offset = 4,
        boundaryOffset,
        isNonDialog,
        containerPadding = 16,
        containerProps,
        placement: placementProp,
        style: styleProp,
        ...otherProps
    } = ownProps;

    const placement = useResponsiveValue(placementProp) ?? "bottom";
    const { stylingProps: containerStylingProps, ...containerOwnProps } = useStyledSystem(containerProps ?? {});
    const {
        className: containerClassName,
        style: containerStyleProp,
        slot,
        ...containerOtherProps
    } = containerOwnProps;

    const popoverClassNames = composeClassnameRenderProps(
        className,
        GlobalPopoverCssSelector,
        cssModule(
            styles,
            "hop-Popover",
            isNonDialog && "non-dialog"
        ),
        stylingProps.className
    );

    const containerClassNames = isNonDialog ?
        clsx(containerClassName, styles["hop-Popover__dropdown"], containerStylingProps.className) :
        clsx(containerClassName, styles["hop-Popover__dialog"], containerStylingProps.className);

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            "--container-padding": `${containerPadding}px`,
            ...prev
        };
    });

    const containerStyle = {
        ...containerStylingProps.style,
        ...containerStyleProp
    };

    return (
        <RACPopover
            offset={offset}
            ref={ref}
            className={popoverClassNames}
            arrowBoundaryOffset={boundaryOffset}
            data-auto-width={isAutoWidth || undefined}
            containerPadding={containerPadding}
            style={style}
            placement={placement}
            {...otherProps}
        >
            {state => {
                const content = (isFunction(children) && !isNil(children)) ? children(state) : children;

                if (isNonDialog) {
                    return (
                        <HopperProvider {...prevContextProps} className={styles["hop-Popover__wrapper"]}>
                            <div
                                {...containerOtherProps}
                                className={containerClassNames}
                                style={containerStyle}
                                slot={slot || undefined}
                            >
                                <SlotProvider values={[
                                    [ListBoxContext, {
                                        className: styles["hop-Popover__list-box"]
                                    }],
                                    [FooterContext, {
                                        className: styles["hop-Popover__footer"]
                                    }],
                                    [LinkContext, {
                                        size: "sm",
                                        variant: "primary",
                                        isQuiet: true
                                    }]
                                ]}
                                >
                                    {content}
                                </SlotProvider>
                            </div>
                        </HopperProvider>
                    );
                }

                return (
                    <HopperProvider {...prevContextProps}>
                        <Dialog {...containerOtherProps} className={containerClassNames} style={containerStyle}>
                            <SlotProvider values={[
                                [HeadingContext, {
                                    slot: "title",
                                    className: styles["hop-Popover__title"],
                                    size: "unset"
                                }],
                                [ButtonContext, {
                                    size: "sm",
                                    className: styles["hop-Popover__action"]
                                }],
                                [LinkButtonContext, {
                                    size: "sm",
                                    className: styles["hop-Popover__action"]
                                }],
                                [ButtonGroupContext, {
                                    size: "sm",
                                    align: "end",
                                    className: styles["hop-Popover__actions"]
                                }],
                                [ContentContext, {
                                    className: styles["hop-Popover__content"]
                                }],
                                [FooterContext, {
                                    className: styles["hop-Popover__footer"]
                                }],
                                [LinkContext, {
                                    size: "sm",
                                    variant: "primary",
                                    isQuiet: true
                                }]
                            ]}
                            >
                                {content}
                            </SlotProvider>
                        </Dialog>
                    </HopperProvider>
                );
            }}
        </RACPopover>
    );
}

/**
 * Popovers are small overlays that open on demand. They let users access additional content and actions without cluttering the page.
 *
 * [View Documentation](https://hopper.workleap.design/components/Popover)
 */
const _Popover = forwardRef<HTMLElement, PopoverProps>(Popover);
_Popover.displayName = "Popover";

export { _Popover as Popover };
