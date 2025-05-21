import { type ResponsiveProp, type StyledComponentProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { composeRenderProps, Dialog, type DialogProps, DialogTrigger, type ModalOverlayProps, OverlayTriggerStateContext, useContextProps } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { BaseModal } from "./BaseModal.tsx";
import { CustomModalContext } from "./CustomModalContext.ts";

import styles from "./CustomModal.module.css";

export const GlobalCustomModalCssSelector = "hop-CustomModal";

export interface CustomModalProps extends
    StyledComponentProps<DialogProps>,
    Pick<ModalOverlayProps, "isOpen" | "defaultOpen" | "onOpenChange"> {
    /**
     * Whether the CustomModal is dismissible.
     * @default true
     */
    isDismissible?: boolean;
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
}

const CustomModal = (props: CustomModalProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, CustomModalContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        style,
        slot,
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
            isDismissable={isDismissible}
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

export const CustomModalTrigger = DialogTrigger;
