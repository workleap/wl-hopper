import {
    useResponsiveValue
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type ForwardedRef } from "react";

import { cssModule } from "../../../utils/index.ts";
import { Text, type TextProps } from "../../text/index.ts";

import styles from "./Paragraph.module.css";

export const GlobalParagraphCssSelector = "hop-Paragraph";

export interface ParagraphProps extends Omit<TextProps, "elementType"> {

}

function Paragraph(props: ParagraphProps, ref: ForwardedRef<HTMLParagraphElement>) {
    const { size: sizeProp, className, children, ...otherProps } = props;

    const size = useResponsiveValue(sizeProp ?? "md");

    const classNames = clsx(
        GlobalParagraphCssSelector,
        cssModule(
            styles,
            "hop-Paragraph",
            size
        ),
        className
    );

    return (
        <Text
            ref={ref}
            elementType="p"
            className={classNames}
            size={sizeProp}
            {...otherProps}
        >
            {children}
        </Text>
    );
}

/**
 * A paragraph is used to render blocks of text.
 *
 * [View Documentation](https://hopper.workleap.design/components/Paragraph)
 */
const _Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(Paragraph);
_Paragraph.displayName = "Paragraph";

export { _Paragraph as Paragraph };
