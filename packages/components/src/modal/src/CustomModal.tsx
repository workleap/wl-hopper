import { type ResponsiveProp, type StyledComponentProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { composeRenderProps, Dialog, type DialogProps, type ModalOverlayProps, OverlayTriggerStateContext, useContextProps } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { BaseModal } from "./BaseModal.tsx";
import { CustomModalContext } from "./CustomModalContext.ts";
import { ModalTrigger } from "./ModalTrigger.tsx";

import styles from "./CustomModal.module.css";

export const GlobalCustomModalCssSelector = "hop-CustomModal";

export interface CustomModalProps extends
    StyledComponentProps<DialogProps>,
    Pick<ModalOverlayProps, "isOpen" | "defaultOpen"> {
    /**
     * Whether the Modal is dismissable.
     * @default true
     * @deprecated Use `isDismissable` instead. This prop will be removed in a future version (September 30th, 2025).
     */
    isDismissible?: boolean;
    /**
     * Whether the CustomModal is dismissable.
     * @default true
     */
    isDismissable?: boolean;
    /**
     * Whether pressing the escape key to close the dialog should be disabled.
     */
    isKeyboardDismissDisabled?: boolean;
    /**
     * The size of the CustomModal.
     * @default "md"
     */
    size?: ResponsiveProp<"sm" | "md" | "lg" | "xl" | "fullscreen" | "fullscreenTakeover">;
    /**
     * The props of the overlay
     */
    overlayProps?: Partial<ModalOverlayProps>;
    /**
     * Handler that is called when the custom modal's open state changes.
     * This handler is only called when the modal is not used inside a `ModalTrigger`. Use the `onOpenChange` prop of `ModalTrigger` instead if it's part of a trigger
     */
    onOpenChange?: (isOpen: boolean) => void;
}

const CustomModal = (props: CustomModalProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, CustomModalContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        style,
        slot,
        isDismissable = true,
        isDismissible = true,
        isKeyboardDismissDisabled,
        size: sizeProp,
        overlayProps,
        isOpen,
        defaultOpen,
        onOpenChange,
        children: childrenProp,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = clsx(
        GlobalCustomModalCssSelector,
        cssModule(
            styles,
            GlobalCustomModalCssSelector,
            size.toLowerCase()
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const children = composeRenderProps(childrenProp, prev => {
        return prev;
    });

    return (
        <BaseModal
            {...overlayProps}
            isOpen={isOpen}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            size={size}
            isDismissable={isDismissable ?? isDismissible}
            isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        >
            <Dialog
                {...otherProps}
                ref={ref}
                className={classNames}
                style={mergedStyles}
                slot={slot}
            >
                {renderProps => (
                    <OverlayTriggerStateContext.Provider value={null}>
                        {children(renderProps)}
                    </OverlayTriggerStateContext.Provider>
                )}
            </Dialog>
        </BaseModal>
    );
};

/**
 * A CustomModal is a Modal with a custom layout.
 *
 * [View Documentation](https://hopper.workleap.design/components/Modal)
 */
const _CustomModal = forwardRef<HTMLDivElement, CustomModalProps>(CustomModal);
_CustomModal.displayName = "CustomModal";

export { _CustomModal as CustomModal };

export const CustomModalTrigger = ModalTrigger;
