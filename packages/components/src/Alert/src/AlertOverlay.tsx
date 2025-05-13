import { getRootCSSClasses, type StyledComponentProps, useColorSchemeContext, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { ModalOverlay, type ModalOverlayProps, Modal as RACModal } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./AlertOverlay.module.css";

export const GlobalAlertOverlayCssSelector = "hop-AlertOverlay";

export interface AlertOverlayProps extends StyledComponentProps<ModalOverlayProps> {
}

const AlertOverlay = (props: AlertOverlayProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
        slot,
        children,
        ...otherProps
    } = ownProps;

    const { colorScheme } = useColorSchemeContext();
    const classNames = clsx(
        GlobalAlertOverlayCssSelector,
        cssModule(
            styles,
            GlobalAlertOverlayCssSelector
        ),
        getRootCSSClasses(colorScheme),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <ModalOverlay
            className={classNames}
            style={mergedStyles}
            slot={slot}
            {...otherProps}
        >
            <RACModal {...otherProps} ref={ref} className={styles["hop-AlertOverlay__modal"]}>
                {children}
            </RACModal>
        </ModalOverlay>
    );
};

/**
 * The overlay of the Alert component.
 *
 * [View Documentation](https://hopper.workleap.design/components/Alert)
 */
const _AlertOverlay = forwardRef<HTMLDivElement, AlertOverlayProps>(AlertOverlay);
_AlertOverlay.displayName = "AlertOverlay";

export { _AlertOverlay as AlertOverlay };
