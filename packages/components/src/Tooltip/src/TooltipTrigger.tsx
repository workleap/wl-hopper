import { Div } from "@hopper-ui/styled-system";
import { getOwnerWindow, isFocusable, mergeRefs } from "@react-aria/utils";
import type { FocusableElement } from "@react-types/shared";
import { Children, cloneElement, type ForwardedRef, forwardRef, type ReactElement, useEffect, useState, version } from "react";
import { useFocusable, useObjectRef } from "react-aria";
import { TooltipTrigger as RACTooltipTrigger, type TooltipProps, type TooltipTriggerComponentProps } from "react-aria-components";

import { TooltipTriggerContext } from "./TooltipTriggerContext.ts";

export const GlobalTooltipTriggerCssSelector = "hop-TooltipTrigger";

export interface TooltipTriggerProps extends
    Omit<TooltipTriggerComponentProps, "closeDelay">,
    Pick<TooltipProps, "shouldFlip" | "containerPadding" | "offset" | "crossOffset"> {
    /**
     * The placement of the element with respect to its anchor element.
     *
     * @default 'top'
     */
    placement?: "start" | "end" | "right" | "left" | "top" | "bottom";
}

/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 *
 * [View Documentation](https://hopper.workleap.design/components/Tooltip)
 */
export function TooltipTrigger(props: TooltipTriggerProps) {
    // React 19 handles the ref differently
    const [trigger, tooltip] = parseInt(version, 10) < 19
        ? Children.toArray(props.children) as [ReactElement, ReactElement]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        : Children.toArray(props.children) as [any, any];

    const {
        delay = 600,
        containerPadding = 16,
        crossOffset,
        offset = 8,
        placement = "top",
        shouldFlip,
        isDisabled,
        ...triggerProps
    } = props;

    return (
        <RACTooltipTrigger delay={delay} isDisabled={isDisabled} {...triggerProps}>
            <TooltipTriggerContext.Provider
                value={{
                    containerPadding,
                    crossOffset,
                    offset,
                    placement,
                    shouldFlip
                }}
            >
                <FocusableTrigger {...props}>
                    {trigger}
                </FocusableTrigger>
                {tooltip}
            </TooltipTriggerContext.Provider>
        </RACTooltipTrigger>
    );
}

const FocusableTrigger = forwardRef(({ children, ...props }: TooltipTriggerProps, ref: ForwardedRef<FocusableElement>) => {
    const objectRef = useObjectRef(ref);
    const { focusableProps } = useFocusable(props, objectRef);
    const [focusable, setFocusable] = useState(true);
    const child = Children.only(children) as ReactElement<FocusableElement>;

    // @ts-expect-error - Accessing refs is different for React 19
    const childRef = parseInt(version, 10) < 19 ? child.ref : child.props.ref;

    useEffect(() => {
        const el = objectRef.current;

        if (!el || !(el instanceof getOwnerWindow(el).Element)) {
            console.warn("<FocusableTrigger>'s child must forward its ref to a DOM element.");

            return;
        }

        if (!props.isDisabled && !isFocusable(el)) {
            setFocusable(false);
        }
    }, [objectRef, props.isDisabled]);

    if (!focusable) {
        // @ts-expect-error - set the objectRef as the ref
        return <Div {...focusableProps} ref={objectRef} width="fit-content">{children}</Div>;
    }

    return cloneElement(
        child,
        {
            ...child.props,
            // @ts-expect-error - merge refs
            ref: mergeRefs(childRef, objectRef)
        }
    );
});

TooltipTrigger.displayName = "TooltipTrigger";
