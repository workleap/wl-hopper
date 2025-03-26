import { isFocusable, mergeRefs } from "@react-aria/utils";
import type { FocusableElement } from "@react-types/shared";
import { Children, cloneElement, type ForwardedRef, forwardRef, type ReactElement, type ReactNode, useEffect, useState, version } from "react";
import { Focusable, useFocusable, useObjectRef } from "react-aria";
import { TooltipTrigger as RACTooltipTrigger, TooltipContext, type TooltipProps, type TooltipTriggerComponentProps } from "react-aria-components";

import { InternalTooltipTriggerContext } from "./TooltipTriggerContext.ts";

export const GlobalTooltipTriggerCssSelector = "hop-TooltipTrigger";

export interface TooltipTriggerProps extends
    Omit<TooltipTriggerComponentProps, "children" | "closeDelay">,
    Pick<TooltipProps, "shouldFlip" | "containerPadding" | "offset" | "crossOffset" | "triggerRef"> {
    /**
     * The content of the tooltip.
     */
    children: ReactNode;
    /**
     * The placement of the element with respect to its anchor element.
     *
     * @default 'top'
     */
    placement?: "start" | "end" | "right" | "left" | "top" | "bottom";
}

function TooltipTrigger(props: TooltipTriggerProps, ref: ForwardedRef<FocusableElement>) {
    const objectRef = useObjectRef(ref);
    const [focusable, setFocusable] = useState(true);
    const { focusableProps } = useFocusable(props, objectRef);

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

    let newTrigger = cloneElement(
        trigger,
        {
            ref: mergeRefs(trigger.props.ref, objectRef)
        }
    );

    useEffect(() => {
        if (!isDisabled && objectRef.current && !isFocusable(objectRef.current)) {
            setFocusable(false);
        }
    }, [isDisabled, objectRef]);

    newTrigger = focusable ? newTrigger : <Focusable><div {...focusableProps}>{newTrigger}</div></Focusable>;

    return (
        <RACTooltipTrigger delay={delay} isDisabled={isDisabled} {...triggerProps}>
            <TooltipContext.Provider value={{ triggerRef: objectRef }}>
                <InternalTooltipTriggerContext.Provider
                    value={{
                        containerPadding,
                        crossOffset,
                        offset,
                        placement,
                        shouldFlip
                    }}
                >
                    {newTrigger}
                    {tooltip}
                </InternalTooltipTriggerContext.Provider>
            </TooltipContext.Provider>
        </RACTooltipTrigger>
    );
}

/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 *
 * [View Documentation](https://hopper.workleap.design/components/Tooltip)
 */
const _TooltipTrigger = forwardRef<FocusableElement, TooltipTriggerProps>(TooltipTrigger);
_TooltipTrigger.displayName = "TooltipTrigger";

export { _TooltipTrigger as TooltipTrigger };
