import { Div } from "@hopper-ui/styled-system";
import { type FocusableAria, FocusableContext, type FocusableOptions, FocusableProvider, useFocusable } from "@react-aria/interactions";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import type { FocusableElement } from "@react-types/shared";
import { Children, cloneElement, type ForwardedRef, forwardRef, type ReactElement, type Ref, type RefObject, useContext, useMemo, version } from "react";
import { useObjectRef } from "react-aria";
import { TooltipTrigger as RACTooltipTrigger, type TooltipProps, type TooltipTriggerComponentProps } from "react-aria-components";

import { useSlot } from "../../utils/index.ts";

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

const FocusableTrigger = forwardRef(({ children, ...props }: TooltipTriggerProps, ref: ForwardedRef<FocusableElement>) => {
    const objectRef = useObjectRef(ref);
    const { focusableProps } = useFocusableWithoutTabIndex(props, objectRef);
    const [focusableRef, hasFocusableRACElement] = useSlot<FocusableElement>();
    const context = useContext(FocusableContext);

    const content = useMemo(() => {
        const child = Children.only(children) as ReactElement<FocusableElement>;

        // HACK: a disabled element doesn't fire event, therefore the element is wrapped in a div.
        const trigger = isTriggerDisabled(child) ? (
            <Div display="inline-block" {...focusableProps} ref={objectRef as Ref<HTMLDivElement>} >{child}</Div>
        ) : child;

        // If the ref set by the context is not null, it means that the element is using useFocusable, therefore we don't need to do anything
        if (hasFocusableRACElement) {
            return trigger;
        }

        // Otherwise, we need to find an alternative way to forward the onPointerEnter and onPointerLeave events
        // to the trigger element. This is done by cloning the element and passing the hoverableProps to it.
        return cloneElement(
            trigger,
            {
                ...mergeProps(focusableProps, trigger.props),
                ref: mergeRefs(getChildRef(trigger), objectRef)
            }
        );
    }, [children, focusableProps, objectRef, hasFocusableRACElement]);

    return (
        // We forward the FocusableProvider props, but we make sure to merge the refs
        <FocusableProvider {...context} ref={mergeRefs(context?.ref, objectRef, focusableRef)}>
            {content}
        </FocusableProvider>
    );
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTriggerDisabled(child: ReactElement<any>) {
    return child.props.disabled || child.props.isDisabled;
}

function getChildRef(child: ReactElement<FocusableElement>) {
    // @ts-expect-error - Accessing refs is different for React 19
    return parseInt(version, 10) < 19 ? child.ref : child.props.ref;
}

function useFocusableWithoutTabIndex(props: FocusableOptions<FocusableElement>, objectRef: RefObject<FocusableElement | null>): FocusableAria {
    const { focusableProps } = useFocusable(props, objectRef);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tabIndex, ...focusablePropsWithoutTabIndex } = focusableProps;

    return {
        focusableProps: {
            ...focusablePropsWithoutTabIndex
        }
    };
}
