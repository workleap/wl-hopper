import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import type { CSSProperties } from "react";
import { MenuSection as RACMenuSection, type MenuSectionProps as RACMenuSectionProps } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./MenuSection.module.css";

export const GlobalMenuSectionCssSelector = "hop-MenuSection";

export interface MenuSectionProps<T> extends StyledComponentProps<RACMenuSectionProps<T>>{}

export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const { className, style, children, ...otherProps } = ownProps;

    const classNames = clsx(
        className,
        GlobalMenuSectionCssSelector,
        cssModule(
            styles,
            GlobalMenuSectionCssSelector
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <RACMenuSection
            {...otherProps}
            className={classNames}
            style={mergedStyles}
        >
            {children}
        </RACMenuSection>
    );
}
