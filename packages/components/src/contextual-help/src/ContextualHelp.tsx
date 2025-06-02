import { InfoIcon, QuestionIcon, type IconSize } from "@hopper-ui/icons";
import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { forwardRef, useCallback, useEffect, useRef, useState, type CSSProperties, type ForwardedRef, type ReactNode, type RefObject } from "react";
import type { HoverEvent } from "react-aria";
import { Button, Provider, ButtonContext as RACButtonContext, useContextProps, type ButtonProps, type PressEvent } from "react-aria-components";

import { PopoverBase, PopoverTrigger, type PopoverBaseProps, type PopoverTriggerProps } from "../../overlays/index.ts";
import { TextContext } from "../../typography/index.ts";
import { ClearContainerSlots, ClearProviders, cssModule, ensureTextWrapper } from "../../utils/index.ts";

import { ContextualHelpContext } from "./ContextualHelpContext.ts";

import styles from "./ContextualHelp.module.css";

export const GlobalContextualHelpCssSelector = "hop-ContextualHelp";

export interface ContextualHelpProps extends
    StyledComponentProps<ButtonProps>,
    Pick<PopoverTriggerProps, "isOpen" | "defaultOpen" | "onOpenChange">,
    Pick<PopoverBaseProps, "shouldFlip" | "offset" | "crossOffset" | "placement"> {
    /**
     * The contents of the ContextualHelp.
     */
    children: ReactNode;
    /**
     * The size of the ContextualHelp button.
     * @default "sm"
     */
    size?: ResponsiveProp<IconSize>;
    /**
     * The props for the Popover
     */
    popoverProps?: PopoverBaseProps;
    /**
     * The visual style of the ContextualHelp.
     * @default "help"
     */
    variant?: "help" | "info";
}

function ContextualHelp(props: ContextualHelpProps, ref: ForwardedRef<HTMLButtonElement>) {
    [props, ref] = useContextProps(props, ref, ContextualHelpContext);
    const popoverRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [openTrigger, setOpenTrigger] = useState<"click" | "hover" | undefined>(undefined);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        defaultOpen,
        isOpen: isOpenProp,
        offset,
        crossOffset,
        onHoverStart,
        onOpenChange,
        onPress,
        popoverProps,
        placement = "top",
        shouldFlip,
        size: sizeProp,
        style,
        slot,
        variant = "help",
        ...otherProps
    } = ownProps;
    const [isOpen, setOpen] = useControlledState(isOpenProp, defaultOpen || false, onOpenChange);
    const size = useResponsiveValue(sizeProp) ?? "sm";

    const classNames = clsx(
        GlobalContextualHelpCssSelector,
        cssModule(
            styles,
            GlobalContextualHelpCssSelector,
            placement
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const clearCloseTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const scheduleClose = useCallback(() => {
        clearCloseTimeout();

        timeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, 50);
    }, [clearCloseTimeout, setOpen]);

    const handleOpenChanged = useCallback((open: boolean) => {
        if (openTrigger !== "hover") {
            setOpen(open);
        }
        if (!open) {
            setOpenTrigger(undefined);
        }
    }, [setOpen, openTrigger]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!isOpen || openTrigger !== "hover") {return;}

        const { clientX, clientY } = event;

        if (isPointInSafeArea(clientX, clientY, ref, popoverRef)) {
            clearCloseTimeout();
        } else {
            scheduleClose();
        }
    }, [isOpen, openTrigger, ref, clearCloseTimeout, scheduleClose]);

    const handleTriggerMouseEnter = useCallback(() => {
        clearCloseTimeout();
        setOpen(true);
    }, [clearCloseTimeout, setOpen]);

    useEffect(() => {
        if (isOpen) {
            // we need ot add to the document to capture mouse movements outside the button and popover, the safe zone in between
            document.addEventListener("mousemove", handleMouseMove);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                clearCloseTimeout();
            };
        }
    }, [clearCloseTimeout, handleMouseMove, isOpen]);

    const handlePressed = useCallback((e: PressEvent) => {
        onPress?.(e);
        setOpenTrigger("click");
    }, [setOpenTrigger, onPress]);

    const handleHoverStarted = useCallback((e: HoverEvent) => {
        onHoverStart?.(e);
        handleTriggerMouseEnter();

        if (openTrigger === undefined) {
            setOpenTrigger("hover");
        }
    }, [handleTriggerMouseEnter, openTrigger, setOpenTrigger, onHoverStart]);

    const Icon = variant === "help" ? QuestionIcon : InfoIcon;

    return (
        /**
         * TODO: Remove the ClearContainerSlots once RAC deploys the issue of Contexts being passed down to Popovers.
         * https://github.com/adobe/react-spectrum/pull/8321#issue-3098913572
         */
        <ClearProviders
            values={[
                RACButtonContext
            ]}
        >
            <ClearContainerSlots>
                <PopoverTrigger isOpen={isOpen} onOpenChange={handleOpenChanged}>
                    <Button
                        slot={slot ?? undefined}
                        className={classNames}
                        style={mergedStyles}
                        ref={ref}
                        onPress={handlePressed}
                        onHoverStart={handleHoverStarted}
                        {...otherProps}
                    >
                        <Icon size={size} />
                    </Button>
                    <PopoverBase
                        ref={popoverRef}
                        crossOffset={crossOffset}
                        isNonModal={openTrigger === "hover"}
                        offset={offset}
                        placement={placement}
                        shouldFlip={shouldFlip}
                        className={clsx(popoverProps?.className, styles["hop-ContextualHelp__popover"])}
                    >
                        <Provider
                            values={[
                                [TextContext, {
                                    size: "xs"
                                }]
                            ]}
                        >
                            {ensureTextWrapper(children)}
                        </Provider>
                    </PopoverBase>
                </PopoverTrigger>
            </ClearContainerSlots>
        </ClearProviders>
    );
}

function isPointInSafeArea(x: number, y: number, triggeRef: RefObject<HTMLButtonElement | null>, popoverRef: RefObject<HTMLDivElement | null>) {
    if (!triggeRef.current || !popoverRef.current) {return false;}

    const triggerRect = triggeRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    const safeArea = {
        top: Math.min(triggerRect.top, popoverRect.top),
        right: Math.max(triggerRect.right, popoverRect.right),
        bottom: Math.max(triggerRect.bottom, popoverRect.bottom),
        left: Math.min(triggerRect.left, popoverRect.left)
    };

    const isSafe = (
        x >= safeArea.left &&
        x <= safeArea.right &&
        y >= safeArea.top &&
        y <= safeArea.bottom
    );

    return isSafe;
}

/**
 * Contextual help shows a user extra information about the state of an adjacent component.
 * It explains a high-level topic about an experience and can point users to more information elsewhere.
 *
 * [View Documentation](https://hopper.workleap.design/components/ContextualHelp)
 */
const _ContextualHelp = forwardRef<HTMLButtonElement, ContextualHelpProps>(ContextualHelp);
_ContextualHelp.displayName = "ContextualHelp";

export { _ContextualHelp as ContextualHelp };
