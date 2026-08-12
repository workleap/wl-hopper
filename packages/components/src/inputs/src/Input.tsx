import {
    type ResponsiveProp,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, createContext, forwardRef } from "react";
import {
    type ContextValue,
    Input as RACInput,
    type InputProps as RACInputProps,
    useContextProps
} from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./Input.module.css";

export interface InputProps extends StyledComponentProps<Omit<RACInputProps, "size">> {
    /**
     * The size of the input.
     * @default "md"
     */
    size?: ResponsiveProp<"sm" | "md">;
}

export const InputContext = createContext<ContextValue<InputProps, HTMLInputElement>>({});

export const Input = forwardRef(function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
    [props, ref] = useContextProps(props, ref, InputContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, size: sizeProp, style, ...otherProps } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = clsx(className, cssModule(styles, "hop-Input", size), stylingProps.className);

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return <RACInput {...otherProps} ref={ref} className={classNames} style={mergedStyles} />;
});
