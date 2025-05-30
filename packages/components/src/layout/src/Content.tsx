import { slot as slotFn, useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { ClearProviders, type BaseComponentDOMProps } from "../../utils/index.ts";

import { ContentContext, type ContentContextValue } from "./ContentContext.ts";

export const GlobalContentCssSelector = "hop-Content";

export interface ContentProps extends StyledComponentProps<BaseComponentDOMProps> {
}

function Content(props: ContentProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, ContentContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props as ContentContextValue);
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
        GlobalContentCssSelector,
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <ClearProviders values={clearContexts}>
            <div
                ref={ref}
                className={classNames}
                style={mergedStyles}
                slot={slot || undefined}
                {...otherProps}
            >
                {children}
            </div>
        </ClearProviders>
    );
}

/**
 * The Content component represents a Content within a Hopper container such as a Modal or Popover.
 *
 * [View Documentation](https://hopper.workleap.design/components/Content)
 */
const _Content = slotFn("content", forwardRef<HTMLDivElement, ContentProps>(Content));
_Content.displayName = "Content";

export { _Content as Content };
