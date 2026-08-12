import clsx from "clsx";
import { type CSSProperties, type ComponentRef, type JSX, forwardRef } from "react";

import type { StyledComponentProps } from "../styledSystemProps.ts";
import { useStyledSystem } from "../useStyledSystem.ts";

import styles from "./htmlElement.module.css";

export type HtmlElementProps<T extends keyof JSX.IntrinsicElements> = StyledComponentProps<T>;

export const GlobalHtmlElementCssSelector = "hop-HtmlElement";
export const GlobalHtmlElementSpecificCssSelector = (elementType: string) =>
    `${GlobalHtmlElementCssSelector}-${elementType}`;

export function htmlElement<T extends keyof JSX.IntrinsicElements>(elementType: T) {
    return forwardRef<ComponentRef<T>, HtmlElementProps<T>>((props, ref) => {
        const { stylingProps, ...ownProps } = useStyledSystem(props);
        const { className, style, ...otherProps } = ownProps;

        const As = elementType;
        const classNames = clsx(
            className,
            styles["hop-HtmlElement"],
            GlobalHtmlElementCssSelector,
            GlobalHtmlElementSpecificCssSelector(elementType),
            stylingProps.className
        );

        const mergedStyles: CSSProperties = {
            ...stylingProps.style,
            ...style
        };

        return (
            // It's too hard for typescript, a generic elementType, with generic props.
            // Basically, the interface is HTMLProps of the elementType + styled system props.
            // useStyledSystem removes the styled system props, so what is remaining is valid for the elementType.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <As ref={ref} style={mergedStyles} className={classNames} {...otherProps} />
        );
    });
}
