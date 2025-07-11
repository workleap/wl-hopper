import { slot as slotFn, useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { Header as RACHeader, useContextProps } from "react-aria-components";

import { ClearProviders, type BaseComponentDOMProps } from "../../utils/index.ts";

import { HeaderContext, type HeaderContextValue } from "./HeaderContext.ts";

export const GlobalHeaderCssSelector = "hop-Header";

export interface HeaderProps extends StyledComponentProps<BaseComponentDOMProps> {}

function Header(props: HeaderProps, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref, HeaderContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props as HeaderContextValue);
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
        GlobalHeaderCssSelector,
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <ClearProviders values={clearContexts}>
            <RACHeader
                ref={ref}
                className={classNames}
                style={mergedStyles}
                slot={slot || undefined}
                {...otherProps}
            >
                {children}
            </RACHeader>
        </ClearProviders>
    );
}

/**
 * The Header component represents a header within a Hopper container such as a Modal or Section.
 *
 * [View Documentation](https://hopper.workleap.design/components/Header)
 */
const _Header = slotFn("header", forwardRef<HTMLElement, HeaderProps>(Header));
_Header.displayName = "Header";

export { _Header as Header };
