import { InfoIcon } from "@hopper-ui/icons";
import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, useContext } from "react";
import { FieldErrorContext as RACFieldErrorContext, useContextProps } from "react-aria-components";

import { type TextProps, Text } from "../../typography/Text/index.ts";
import { cssModule } from "../../utils/index.ts";

import { HelperMessageContext } from "./HelperMessageContext.ts";

import styles from "./HelperMessage.module.css";

export const GlobalHelperMessageCssSelector = "hop-HelperMessage";

export interface HelperMessageProps extends StyledComponentProps<Omit<TextProps, "size">> {
    /**
     * Whether or not to hide the helper message icon.
     */
    hideIcon?: boolean;
}

function HelperMessage(props: HelperMessageProps, ref: ForwardedRef<HTMLSpanElement>) {
    const validation = useContext(RACFieldErrorContext);
    if (validation?.isInvalid) {
        return null;
    }

    return <HelperMessageInner {...props} ref={ref} />;
}

/**
 * The HelperMessage component is used to display auxiliary text to guide users in the interface.
 *
 * [View Documentation](https://hopper.workleap.design/components/HelperMessage)
 */
const _HelperMessage = forwardRef<HTMLSpanElement, HelperMessageProps>(HelperMessage);
_HelperMessage.displayName = "HelperMessage";

export { _HelperMessage as HelperMessage };

const HelperMessageInner = forwardRef((props: HelperMessageProps, ref: ForwardedRef<HTMLSpanElement>) => {
    [props, ref] = useContextProps(props, ref, HelperMessageContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, children, hideIcon = false, style, slot = "description", ...otherProps } = ownProps;

    const classNames = clsx(
        GlobalHelperMessageCssSelector,
        cssModule(
            styles,
            "hop-HelperMessage"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <Text
            ref={ref}
            className={classNames}
            style={mergedStyles}
            size="xs"
            slot={slot}
            {...otherProps}
        >
            {!hideIcon && <InfoIcon size="sm" className={styles["hop-HelperMessage__icon"]} />}
            {children}
        </Text>
    );
});
