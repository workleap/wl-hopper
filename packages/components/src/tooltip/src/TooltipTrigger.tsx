import { Div, useIsomorphicLayoutEffect } from "@hopper-ui/styled-system";
import { FocusableContext, FocusableProvider, useFocusable } from "@react-aria/interactions";
import { mergeRefs } from "@react-aria/utils";
import type { FocusableElement } from "@react-types/shared";
import { Children, cloneElement, forwardRef, type ReactElement, type Ref, type RefObject, useContext } from "react";
import { useObjectRef } from "react-aria";
import { TooltipTrigger as RACTooltipTrigger, type TooltipProps, type TooltipTriggerComponentProps } from "react-aria-components";

import { createSyntheticEvent, getChildRef, useSlot } from "../../utils/index.ts";

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
    const [trigger, tooltip] = Children.toArray(props.children) as [ReactElement, ReactElement];

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

/**
 * RAC has the assumption that the trigger element is another RAC component. They also provide the Focusable component to allow any trigger to work
 * with their tooltip. However, they enforce some accessibility checks on the trigger elements, such as that the element is focusable. In many of
 * our product sadly, they put tooltips on anything. Disabled buttons, divs, spans, etc. This is a problem because the RAC Focusable component
 * would make those elements tabbable, or would put warning in the console. So we created this wrapper to allow any element to be used as a trigger.
 * If the child is disabled (therefore prevents the element from reacting to pointer enter/leave), we wrap it in a div, and we attach the focusable props to that div.
 * If the child is something not from RAC, instead of wrapping it in a div, we just attach the focusable props to the element directly.
 */
function FocusableTrigger(props: TooltipTriggerProps) {
    const [focusableRef, hasFocusableRACElement] = useSlot<FocusableElement>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = Children.only(props.children) as ReactElement<any>;
    const isChildDisabled = isTriggerDisabled(child);
    const context = useContext(FocusableContext);

    // If the properties can't be forwarded via the context, or put on the disabled trigger, we need to attach event handlers straight on the element.
    useForwardFocusablePropsToRef({
        disabled: hasFocusableRACElement || isChildDisabled,
        triggerRef: context?.ref
    });

    // HACK: a disabled element doesn't fire event, therefore the element is wrapped in a div.
    const trigger = isChildDisabled ? (
        <DisabledTriggerWrapper ref={context?.ref as Ref<HTMLDivElement> ?? undefined} {...props}>
            {child}
        </DisabledTriggerWrapper>
    ) : cloneElement(child, { ref: mergeRefs(getChildRef(child), context?.ref) });


    return (
        // We forward the FocusableProvider props, but we make sure to merge the refs
        // This allows us to know if the child is implementing the Focusable interface, aka is a RAC component.
        <FocusableProvider {...context} ref={mergeRefs(context?.ref, focusableRef)}>
            {trigger}
        </FocusableProvider>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTriggerDisabled(child: ReactElement<any>) {
    return child.props.disabled || child.props.isDisabled;
}

const DisabledTriggerWrapper = forwardRef<HTMLDivElement, TooltipTriggerProps>(({ children, ...props }, ref) => {
    const objectRef = useObjectRef(ref);
    const { focusableProps } = useFocusable(props, objectRef);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tabIndex, ...focusablePropsWithoutTabIndex } = focusableProps;

    return (
        <Div
            ref={objectRef}
            display="inline-block"
            {...focusablePropsWithoutTabIndex}
        >
            {children}
        </Div>
    );
});

interface UseForwardFocusablePropsToRef {
    disabled?: boolean;
    triggerRef?: RefObject<FocusableElement | null>;
}

/**
 * We take the focusable props, and since we can't pass them to the trigger element via the context,
 * and since we can't simply cloneElement with those props, since some RAC components like ProgressBar (for spinner)
 * don't accept onPointerEnter props, we need to attach the events to the trigger element directly.
 */
function useForwardFocusablePropsToRef({ disabled = false, triggerRef }: UseForwardFocusablePropsToRef) {
    const context = useContext(FocusableContext);

    useIsomorphicLayoutEffect(() => {
        if (disabled || !triggerRef?.current) {
            return;
        }

        const onPointerEnter = (e: Event) => {
            context?.onPointerEnter?.(createSyntheticEvent(e));
        };

        const onPointerLeave = (e: Event) => {
            context?.onPointerLeave?.(createSyntheticEvent(e));
        };

        const onPointerDown = (e: Event) => {
            context?.onPointerDown?.(createSyntheticEvent(e));
        };

        const onFocus = (e: Event) => {
            context?.onFocus?.(createSyntheticEvent(e));
        };

        const onBlur = (e: Event) => {
            context?.onBlur?.(createSyntheticEvent(e));
        };

        const onKeyDown = (e: Event) => {
            context?.onKeyDown?.(createSyntheticEvent(e));
        };

        const onKeyUp = (e: Event) => {
            context?.onKeyUp?.(createSyntheticEvent(e));
        };

        const element = triggerRef.current;
        element.addEventListener("pointerenter", onPointerEnter);
        element.addEventListener("pointerleave", onPointerLeave);
        element.addEventListener("pointerdown ", onPointerDown);
        element.addEventListener("focusin", onFocus);
        element.addEventListener("focusout", onBlur);
        element.addEventListener("keydown", onKeyDown);
        element.addEventListener("keyup", onKeyUp);

        return () => {
            element.removeEventListener("pointerenter", onPointerEnter);
            element.removeEventListener("pointerleave", onPointerLeave);
            element.removeEventListener("pointerdown ", onPointerDown);
            element.removeEventListener("focusin", onFocus);
            element.removeEventListener("focusout", onBlur);
            element.removeEventListener("keydown", onKeyDown);
            element.removeEventListener("keyup", onKeyUp);
        };
    }, [triggerRef, context, disabled]);
}
