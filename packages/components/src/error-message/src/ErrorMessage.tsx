import { WarningIcon } from "@hopper-ui/icons";
import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import { type CSSProperties, type ForwardedRef, forwardRef, useContext } from "react";
import {
    type FieldErrorProps as RACFieldErrorProps,
    FieldErrorContext as RACFieldErrorContext,
    composeRenderProps,
    useContextProps
} from "react-aria-components";

import { type TextProps, Text } from "../../typography/Text/index.ts";
import { composeClassnameRenderProps, cssModule, useRenderProps } from "../../utils/index.ts";

import { ErrorMessageContext } from "./ErrorMessageContext.ts";


import styles from "./ErrorMessage.module.css";

export const GlobalErrorMessageCssSelector = "hop-ErrorMessage";

export interface ErrorMessageProps extends StyledComponentProps<RACFieldErrorProps>, Omit<TextProps, "style" | "className" | "children" | "color" | "content"> {
    /**
     * Whether or not to hide the error message icon.
     */
    hideIcon?: boolean;
}

function ErrorMessage(props: ErrorMessageProps, ref: ForwardedRef<HTMLSpanElement>) {
    const validation = useContext(RACFieldErrorContext);
    if (!validation?.isInvalid) {
        return null;
    }

    return <ErrorMessageInner {...props} ref={ref} />;
}

/**
 * An ErrorMessage displays validation errors for a form field.
 *
 * [View Documentation](https://hopper.workleap.design/components/ErrorMessage)
 */
const _ErrorMessage = forwardRef<HTMLSpanElement, ErrorMessageProps>(ErrorMessage);
_ErrorMessage.displayName = "ErrorMessage";

export { _ErrorMessage as ErrorMessage };

const ErrorMessageInner = forwardRef((props: ErrorMessageProps, ref: ForwardedRef<HTMLSpanElement>) => {
    const validation = useContext(RACFieldErrorContext)!;
    [props, ref] = useContextProps(props, ref, ErrorMessageContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        hideIcon = false,
        style: styleProp,
        slot = "errorMessage",
        ...otherProps
    } = ownProps;

    const classNames = composeClassnameRenderProps(
        GlobalErrorMessageCssSelector,
        cssModule(
            styles,
            "hop-ErrorMessage"
        ),
        stylingProps.className,
        className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    }) as CSSProperties;

    const warningIcon = !hideIcon && <WarningIcon size="sm" className={styles["hop-ErrorMessage__icon"]} />;

    const children = composeRenderProps(childrenProp, prev => {
        return prev ? <>{warningIcon} {prev}</> : null;
    });

    const renderProps = useRenderProps({
        ...props,
        className: classNames,
        style,
        children: children,
        defaultChildren: validation.validationErrors.length === 0 ? undefined : <>{warningIcon} {validation.validationErrors.join(" ")}</>,
        values: validation
    });

    // Don't return anything if there is no error message to display
    if (renderProps.children == null) {
        return null;
    }


    return (
        <Text
            slot={slot}
            ref={ref}
            {...otherProps}
            {...renderProps}
        />
    );
});
