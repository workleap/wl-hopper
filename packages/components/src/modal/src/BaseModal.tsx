import { getRootCSSClasses, type ResponsiveProp, type StyledComponentProps, useColorSchemeContext, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, useContext, useEffect } from "react";
import { ModalOverlay, type ModalOverlayProps, Modal as RACModal, useContextProps } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { BaseModalContext } from "./BaseModalContext.ts";
import { InternalModalTriggerContext } from "./ModalContext.ts";

import styles from "./BaseModal.module.css";

export const GlobalBaseModalCssSelector = "hop-BaseModal";

export interface BaseModalProps extends StyledComponentProps<ModalOverlayProps> {
    /**
     * The size of the modal.
     * @default "md"
     */
    size?: ResponsiveProp<"sm" | "md" | "lg" | "xl" | "fullscreen" | "fullscreenTakeover">;
    /**
     * Whether the modal has an image.
     */
    hasImage?: boolean;
    /**
     * Handler that is called when the base modal's open state changes.
     * This handler is only called when the modal is not used inside a `ModalTrigger`. Use the `onOpenChange` prop of `ModalTrigger` instead if it's part of a trigger
     */
    onOpenChange?: (isOpen: boolean) => void;
}

const BaseModal = (props: BaseModalProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, BaseModalContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
        slot,
        size: sizeProp,
        children,
        hasImage,
        onOpenChange,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";
    const { colorScheme } = useColorSchemeContext();
    const internalTriggerContext = useContext(InternalModalTriggerContext);

    useEffect(() => {
        // Implemented this fix in our codebase: https://github.com/adobe/react-spectrum/issues/6547
        if (internalTriggerContext && onOpenChange) {
            console.warn("Modal: `onOpenChange` is not supported when using `ModalTrigger`. Use the `onOpenChange` prop of `ModalTrigger` instead. Refer to https://github.com/adobe/react-spectrum/issues/6547");
        }
    }, [internalTriggerContext, onOpenChange]);

    const classNames = clsx(
        GlobalBaseModalCssSelector,
        cssModule(
            styles,
            GlobalBaseModalCssSelector,
            size.toLowerCase(),
            hasImage && "image"
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
            onOpenChange={onOpenChange}
            slot={slot}
            {...otherProps}
        >
            <RACModal ref={ref} className={styles["hop-BaseModal__modal"]}>
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
