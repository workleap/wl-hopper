import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type NamedExoticComponent } from "react";
import { ListBoxSection as RACListBoxSection, useContextProps, type SectionProps as RACSectionProps } from "react-aria-components";

import { ListBoxSectionContext } from "./ListBoxSectionContext.ts";

export const GlobalSectionCssSelector = "hop-ListBoxSection";

export interface ListBoxSectionProps<T> extends StyledComponentProps<RACSectionProps<T>> {}

function ListBoxSection<T extends object>(props: ListBoxSectionProps<T>, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref, ListBoxSectionContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalSectionCssSelector,
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <RACListBoxSection
            ref={ref}
            className={classNames}
            style={mergedStyles}
            {...otherProps}
        >
            {children}
        </RACListBoxSection>
    );
}

/**
 * A Section serves as a versatile container component, encapsulating an HTML section element to facilitate the organization and grouping of content.
 *
 * [View Documentation](https://hopper.workleap.design/components/ListBox)
 */
const _ListBoxSection = forwardRef(ListBoxSection) as <T>(
    props: ListBoxSectionProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ListBoxSection>;
(_ListBoxSection as NamedExoticComponent).displayName = "ListBoxSection";

export { _ListBoxSection as ListBoxSection };
