import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type ForwardedRef } from "react";
import { composeRenderProps, Disclosure as RACDisclosure, useContextProps, useSlottedContext, type DisclosureProps as RACDisclosureProps } from "react-aria-components";

import { ToggleArrowContext } from "../../ToggleArrow/index.ts";
import { composeClassnameRenderProps, cssModule, SlotProvider } from "../../utils/index.ts";

import { DisclosureContext } from "./DisclosureContext.ts";
import { DisclosureHeaderContext } from "./DisclosureHeaderContext.ts";
import { DisclosurePanelContext } from "./DisclosurePanelContext.ts";

import styles from "./Disclosure.module.css";

export const GlobalDisclosureCssSelector = "hop-Disclosure";

export interface DisclosureProps extends StyledComponentProps<RACDisclosureProps> {
    variant?: "standalone" | "inline";
}

function Disclosure(props: DisclosureProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, DisclosureContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        style: styleProp,
        variant = "standalone",
        ...otherProps
    } = ownProps;

    const disclosureHeaderCtx = useSlottedContext(DisclosureHeaderContext);
    const disclosurePanelCtx = useSlottedContext(DisclosurePanelContext);

    const classNames = composeClassnameRenderProps(
        className,
        GlobalDisclosureCssSelector,
        cssModule(
            styles,
            "hop-Disclosure",
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
        <RACDisclosure
            ref={ref}
            className={classNames}
            style={style}
            {...otherProps}
        >
            {disclosureRenderProps => (
                <SlotProvider values={[
                    [DisclosureContext, {
                        isDisabled: disclosureRenderProps.isDisabled,
                        variant: variant
                    }],
                    [DisclosureHeaderContext, {
                        className: clsx(disclosureHeaderCtx?.className, styles["hop-Disclosure__header"])
                    }],
                    [DisclosurePanelContext, {
                        className: clsx(disclosurePanelCtx?.className, styles["hop-Disclosure__panel"])
                    }],
                    [ToggleArrowContext, {
                        isExpanded: disclosureRenderProps.isExpanded
                    }]
                ]}
                >
                    {children(disclosureRenderProps)}
                </SlotProvider>
            )}
        </RACDisclosure>
    );
}

/**
 * The Disclosure component is used to organize lengthy sections of information within an expandable block, allowing users to reveal or hide content as needed.
 *
 * [View Documentation](https://hopper.workleap.design/components/Disclosure)
 */
const _Disclosure = forwardRef<HTMLDivElement, DisclosureProps>(Disclosure);
_Disclosure.displayName = "Disclosure";

export { _Disclosure as Disclosure };
