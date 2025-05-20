import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import type { DOMProps } from "@react-types/shared";
import { forwardRef, type ForwardedRef } from "react";
import {
    composeRenderProps,
    DisclosureGroup as RACDisclosureGroup,
    useContextProps,
    type DisclosureGroupProps as RACDisclosureGroupProps,
    type SlotProps
} from "react-aria-components";

import { DisclosureContext, DisclosureHeaderContext, DisclosurePanelContext } from "../../Disclosure/index.ts";
import { composeClassnameRenderProps, cssModule, SlotProvider } from "../../utils/index.ts";

import { AccordionContext } from "./AccordionContext.ts";

import styles from "./Accordion.module.css";

export const GlobalAccordionCssSelector = "hop-Accordion";

export interface AccordionProps extends StyledComponentProps<RACDisclosureGroupProps>, DOMProps, SlotProps {
    variant?: "standalone" | "inline";
}

function Accordion(props:AccordionProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AccordionContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        style: styleProp,
        variant = "standalone",
        ...otherProps
    } = ownProps;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalAccordionCssSelector,
        cssModule(
            styles,
            "hop-Accordion",
            variant
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        return prev;
    });

    return (
        <RACDisclosureGroup
            ref={ref}
            className={classNames}
            style={style}
            {...otherProps}
        >
            {accordionRenderProps => (
                <SlotProvider values={[
                    [DisclosureContext, {
                        className: styles["hop-Accordion__disclosure"],
                        variant: "inline"
                    }],
                    [DisclosureHeaderContext, {
                        className: styles["hop-Accordion__disclosure-header"]
                    }],
                    [DisclosurePanelContext, {
                        className: styles["hop-Accordion__disclosure-panel"]
                    }]
                ]}
                >
                    {children(accordionRenderProps)}
                </SlotProvider>
            )}
        </RACDisclosureGroup>
    );
}

/**
 * An accordion is a container for multiple disclosures.
 *
 * [View Documentation](https://hopper.workleap.design/components/Accordion)
 */
const _Accordion = forwardRef<HTMLDivElement, AccordionProps>(Accordion);
_Accordion.displayName = "Accordion";

export { _Accordion as Accordion };
