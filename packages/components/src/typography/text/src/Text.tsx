import {
    slot as slotFn,
    useResponsiveValue,
    useStyledSystem,
    type ResponsiveProp,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useContext, type CSSProperties, type ForwardedRef } from "react";
import { Text as RACText, TextContext as RACTextContext, useContextProps, type TextProps as RACTextProps } from "react-aria-components";

import { cssModule, SlotProvider } from "../../../utils/index.ts";

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
    const { className, size: sizeProp, children, style, elementType = "span", slot, ...otherProps } = ownProps;
    const racContext = useContext(RACTextContext);

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

    const text = (
        <RACText
            ref={ref}
            elementType={elementType}
            className={classNames}
            style={mergedStyles}
            slot={slot || undefined}
            {...otherProps}
        >
            <SlotProvider
                values={[
                    [TextContext, {
                        size: "inherit"
                    }]
                ]}
            >
                {children}
            </SlotProvider>
        </RACText>
    );


    if (slot && racContext && "slots" in racContext && !racContext.slots?.[slot]) {
        console.log("Clearing slot:", slot, Object.keys(racContext.slots!));

        return <RACTextContext.Provider value={null}>{text}</RACTextContext.Provider>;
    }

    return text;
}

/**
 * A primitive text component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Text)
 */
const _Text = slotFn("text", forwardRef<HTMLSpanElement, TextProps>(Text));
_Text.displayName = "Text";

export { _Text as Text };
