import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { Text as RACText, useContextProps, type TextProps as RACTextProps } from "react-aria-components";

import { cssModule } from "../../../utils/index.ts";

import { OverlineTextContext } from "./OverlineTextContext.ts";

import styles from "./OverlineText.module.css";

export const GlobalOverlineTextCssSelector = "hop-OverlineText";

export interface OverlineTextProps extends StyledComponentProps<RACTextProps> {
}

function OverlineText(props: OverlineTextProps, ref: ForwardedRef<HTMLSpanElement>) {
    [props, ref] = useContextProps(props, ref, OverlineTextContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, children, style, elementType = "span", ...otherProps } = ownProps;

    const classNames = clsx(
        GlobalOverlineTextCssSelector,
        cssModule(
            styles,
            "hop-OverlineText"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <RACText
            ref={ref}
            elementType={elementType}
            className={classNames}
            style={mergedStyles}
            {...otherProps}
        >
            <span className={styles["hop-OverlineText__text"]}>{children}</span>
        </RACText>
    );
}

/**
 * A primitive text component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Text)
 */
const _OverlineText = forwardRef<HTMLSpanElement, OverlineTextProps>(OverlineText);
_OverlineText.displayName = "OverlineText";

export { _OverlineText as OverlineText };
