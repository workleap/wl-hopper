import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import {
    DateInput as AriaDateInput,
    DateSegment,
    type DateInputProps as AriaDateInputProps
} from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./DateInput.module.css";

export const GlobalDateInputCssSelector = "hop-DateInput";

export interface DateInputProps extends
    StyledComponentProps<Omit<AriaDateInputProps, "children">> {
    /**
     * The size of the input.
     * @default "md"
     */
    size?: ResponsiveProp<"sm" | "md">;

    /**
     * Whether the input is disabled.
     */
    isDisabled?: boolean;
}

const DateInput = (props: DateInputProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        size: sizeProp,
        style,
        className,
        isDisabled,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = clsx(
        GlobalDateInputCssSelector,
        cssModule(
            styles,
            GlobalDateInputCssSelector,
            size,
            isDisabled && "disabled"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <AriaDateInput {...otherProps} ref={ref} className={classNames} style={mergedStyles}>
            {segment => (
                <DateSegment
                    segment={segment}
                />
            )}
        </AriaDateInput>
    );
};

const _DateInput = forwardRef<HTMLDivElement, DateInputProps>(DateInput);
_DateInput.displayName = "DateInput";

export { _DateInput as DateInput };
