import { slot as slotFn, useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { ClearProviders, type BaseComponentDOMProps } from "../../utils/index.ts";

import { FooterContext, type FooterContextValue } from "./FooterContext.ts";

export const GlobalFooterCssSelector = "hop-Footer";

export interface FooterProps extends StyledComponentProps<BaseComponentDOMProps> {}

function Footer(props: FooterProps, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref, FooterContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props as FooterContextValue);
    const {
        className,
        children,
        style,
        slot,
        isHidden,
        clearContexts,
        ...otherProps
    } = ownProps;

    if (isHidden) {
        return null;
    }

    const classNames = clsx(
        GlobalFooterCssSelector,
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <ClearProviders values={clearContexts}>
            <footer
                ref={ref}
                className={classNames}
                style={mergedStyles}
                slot={slot || undefined}
                {...otherProps}
            >
                {children}
            </footer>
        </ClearProviders>
    );
}

/**
 * The Footer component represents a Footer within a Hopper container such as a Modal or Popover.
 *
 * [View Documentation](https://hopper.workleap.design/components/Footer)
 */
const _Footer = slotFn("footer", forwardRef<HTMLElement, FooterProps>(Footer));
_Footer.displayName = "Footer";

export { _Footer as Footer };
