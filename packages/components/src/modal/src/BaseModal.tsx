import { getRootCSSClasses, type StyledComponentProps, useColorSchemeContext, useStyledSystem, useThemeContext } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type ComponentProps, type CSSProperties, type ForwardedRef, forwardRef, useContext, useEffect } from "react";
import { ModalOverlay, type ModalOverlayProps, Modal as RACModal, useContextProps } from "react-aria-components";

import { BaseModalContext } from "./BaseModalContext.ts";
import { InternalModalTriggerContext } from "./ModalContext.ts";

import styles from "./BaseModal.module.css";

export const GlobalBaseModalCssSelector = "hop-BaseModal";

export interface BaseModalProps extends StyledComponentProps<ModalOverlayProps> {
    /**
     * Handler that is called when the base modal's open state changes.
     * This handler is only called when the modal is not used inside a `ModalTrigger`. Use the `onOpenChange` prop of `ModalTrigger` instead if it's part of a trigger
     */
    onOpenChange?: (isOpen: boolean) => void;

    /**
     * Additional props to pass to the underlying Modal component.
     */
    modalProps?: Partial<ComponentProps<typeof RACModal>>;
}

const BaseModal = (props: BaseModalProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, BaseModalContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
        slot,
        children,
        onOpenChange,
        modalProps,
        ...otherProps
    } = ownProps;
    const { colorScheme } = useColorSchemeContext();
    const { theme } = useThemeContext();
    const internalTriggerContext = useContext(InternalModalTriggerContext);

    useEffect(() => {
        // Implemented this fix in our codebase: https://github.com/adobe/react-spectrum/issues/6547
        if (internalTriggerContext && onOpenChange) {
            console.warn("Modal: `onOpenChange` is not supported when using `ModalTrigger`. Use the `onOpenChange` prop of `ModalTrigger` instead. Refer to https://github.com/adobe/react-spectrum/issues/6547");
        }
    }, [internalTriggerContext, onOpenChange]);

    const classNames = clsx(
        GlobalBaseModalCssSelector,
        styles[GlobalBaseModalCssSelector],
        getRootCSSClasses(colorScheme, theme),
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
            onOpenChange={onOpenChange}
            slot={slot}
            {...otherProps}
        >
            <RACModal ref={ref} {...modalProps} className={clsx(styles["hop-BaseModal__modal"], modalProps?.className)}>
                {children}
            </RACModal>
        </ModalOverlay>
    );
};

/**
 * A BaseModal is an overlay element which blocks interaction with elements outside it.
 *
 * [View Documentation](https://hopper.workleap.design/components/Modal)
 */
const _BaseModal = forwardRef<HTMLDivElement, BaseModalProps>(BaseModal);
_BaseModal.displayName = "BaseModal";

export { _BaseModal as BaseModal };
