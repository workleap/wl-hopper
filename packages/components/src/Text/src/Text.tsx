import { type StyledComponentProps, useStyledSystem, type ResponsiveProp, useResponsiveValue } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type ForwardedRef, forwardRef, type CSSProperties } from "react";
import { Text as RACText, useContextProps, type TextProps as RACTextProps, type SlotProps } from "react-aria-components";

import { cssModule, SlotProvider, ClearContainerSlots } from "../../utils/index.ts";

import { TextContext } from "./TextContext.ts";

import styles from "./Text.module.css";

export const GlobalTextCssSelector = "hop-Text";

// Won't be needed in next react-aria-components release: https://github.com/adobe/react-spectrum/pull/5850
const DefaultTextSlot = "text";

// TODO: ADD issue tracking number in RAC
type FixedRACTextProps = Omit<RACTextProps, "slot"> & SlotProps;

export interface TextProps extends StyledComponentProps<FixedRACTextProps> {
    /**
     * The Typography Type Scale to use.
     * @default "md"
     */
    size?: ResponsiveProp<"inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl">;
}

function Text(props:TextProps, ref: ForwardedRef<HTMLSpanElement>) {
    [props, ref] = useContextProps({ ...props, slot: props.slot === undefined ? DefaultTextSlot : props.slot }, ref, TextContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, size: sizeProp, children, style, elementType = "span", ...otherProps } = ownProps;

    const size = useResponsiveValue(sizeProp ?? "md");

    const classNames = clsx(
        GlobalTextCssSelector,
        cssModule(
            styles,
            "hop-Text",
            size
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
            {...otherProps}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error TODO: add issue number
            slot={props.slot}
            ref={ref}
            elementType={elementType}
            className={classNames}
            style={mergedStyles}
        >
            <ClearContainerSlots>
                <SlotProvider
                    values={[
                        [TextContext, {
                            size:"inherit"
                        }]
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
 * [View Documentation](TODO)
 */
const _Text = forwardRef<HTMLSpanElement, TextProps>(Text);
_Text.displayName = "Text";

export { _Text as Text };
