import {
    type ResponsiveProp,
    type StyledComponentProps,
    slot as slotFn,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { Text as RACText, type TextProps as RACTextProps, useContextProps } from "react-aria-components";

import { ClearContainerSlots, SlotProvider, cssModule } from "../../../utils/index.ts";

import { TextContext } from "./TextContext.ts";

import styles from "./Text.module.css";

export const GlobalTextCssSelector = "hop-Text";

export type TextSize = "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface TextProps extends StyledComponentProps<RACTextProps> {
    /**
     * The Typography Type Scale to use.
     * @default "md"
     */
    size?: ResponsiveProp<TextSize>;
}

function Text(props: TextProps, ref: ForwardedRef<HTMLSpanElement>) {
    [props, ref] = useContextProps(props, ref, TextContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, size: sizeProp, children, style, elementType = "span", ...otherProps } = ownProps;

    const size = useResponsiveValue(sizeProp ?? "md");

    const classNames = clsx(
        GlobalTextCssSelector,
        cssModule(styles, "hop-Text", size),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <RACText ref={ref} elementType={elementType} className={classNames} style={mergedStyles} {...otherProps}>
            <ClearContainerSlots>
                <SlotProvider
                    values={[
                        [
                            TextContext,
                            {
                                size: "inherit"
                            }
                        ]
                    ]}
                >
                    {children}
                </SlotProvider>
            </ClearContainerSlots>
        </RACText>
    );
}

/**
 * A primitive text component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Text)
 */
const _Text = slotFn("text", forwardRef<HTMLSpanElement, TextProps>(Text));
_Text.displayName = "Text";

export { _Text as Text };
