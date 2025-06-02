import { type ResponsiveProp, type StyledComponentProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { composeRenderProps, Dialog, type DialogProps, type ModalOverlayProps, OverlayTriggerStateContext, Provider, useContextProps } from "react-aria-components";

import { ButtonContext, ButtonGroupContext, CloseButton } from "../../buttons/index.ts";
import { HeaderContext } from "../../header/index.ts";
import { ImageContext } from "../../image/index.ts";
import { ContentContext, FooterContext } from "../../layout/index.ts";
import { HeadingContext } from "../../typography/index.ts";
import { cssModule, useSlot } from "../../utils/index.ts";

import { BaseModal } from "./BaseModal.tsx";
import { ModalContext } from "./ModalContext.ts";

import styles from "./Modal.module.css";

export const GlobalModalCssSelector = "hop-Modal";

// Contexts to clear inside the modal.
const ClearContexts = [ImageContext, HeadingContext, HeaderContext, ContentContext, FooterContext, ButtonContext, ButtonGroupContext];

export interface ModalProps extends
    StyledComponentProps<DialogProps>,
    Pick<ModalOverlayProps, "isOpen" | "defaultOpen" | "onOpenChange"> {
    /**
     * Whether the Modal is dismissible.
     * @default true
     */
    isDismissible?: boolean;
    /**
     * Whether pressing the escape key to close the dialog should be disabled.
     */
    isKeyboardDismissDisabled?: boolean;
    /**
     * The size of the modal.
     * @default "md"
     */
    size?: ResponsiveProp<"sm" | "md" | "lg" | "xl" | "fullscreen" | "fullscreenTakeover">;
    /**
     * The props of the overlay
     */
    overlayProps?: Partial<ModalOverlayProps>;
}

const Modal = (props: ModalProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, ModalContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const [imageRef, hasImage] = useSlot();
    const {
        className,
        style,
        slot,
        isDismissible = true,
        isKeyboardDismissDisabled,
        size: sizeProp,
        children: childrenProp,
        isOpen,
        defaultOpen,
        onOpenChange,
        overlayProps,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = clsx(
        GlobalModalCssSelector,
        cssModule(
            styles,
            GlobalModalCssSelector,
            size,
            hasImage && "has-image"
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
            hasImage={hasImage} // TODO: BaseModal should not need a hasImage prop. If we need some style for this, we should pass it through the className instead.
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
                        {/* Top header: heading, header, dismiss button. */}
                        <div className={styles["hop-Modal__top-container"]}>
                            <Provider
                                values={[
                                    [ImageContext, { isHidden: true }],
                                    [HeadingContext, {
                                        className: styles["hop-Modal__heading"],
                                        size: "lg",
                                        slot: "title",
                                        clearContexts: ClearContexts
                                    }],
                                    [HeaderContext, {
                                        className: styles["hop-Modal__header"],
                                        clearContexts: ClearContexts
                                    }],
                                    [ContentContext, { isHidden: true }],
                                    [FooterContext, { isHidden: true }],
                                    [ButtonContext, { isHidden: true }],
                                    [ButtonGroupContext, { isHidden: true }]
                                ]}
                            >
                                {children(renderProps)}
                            </Provider>
                            {isDismissible && <CloseButton className={styles["hop-Modal__close"]} />}
                        </div>

                        {/* Main content */}
                        <Provider
                            values={[
                                [ImageContext, { isHidden: true }],
                                [HeadingContext, { isHidden: true }],
                                [HeaderContext, { isHidden: true }],
                                [ContentContext, {
                                    className: styles["hop-Modal__content"],
                                    clearContexts: ClearContexts
                                }],
                                [FooterContext, { isHidden: true }],
                                [ButtonContext, { isHidden: true }],
                                [ButtonGroupContext, { isHidden: true }]
                            ]}
                        >
                            {children(renderProps)}
                        </Provider>

                        {/* Footer and button group */}
                        <div className={styles["hop-Modal__bottom-container"]}>
                            <Provider
                                values={[
                                    [ImageContext, { isHidden: true }],
                                    [HeadingContext, { isHidden: true }],
                                    [HeaderContext, { isHidden: true }],
                                    [ContentContext, { isHidden: true }],
                                    [FooterContext, {
                                        className: styles["hop-Modal__footer"],
                                        clearContexts: ClearContexts
                                    }],
                                    [ButtonContext, {
                                        className: styles["hop-Modal__button"],
                                        clearContexts: ClearContexts
                                    }],
                                    [ButtonGroupContext, {
                                        className: styles["hop-Modal__button-group"],
                                        clearContexts: ClearContexts
                                    }]
                                ]}
                            >
                                {children(renderProps)}
                            </Provider>
                        </div>

                        {/* image */}
                        <Provider
                            values={[
                                //TODO: should support illustrations
                                [ImageContext, {
                                    className: styles["hop-Modal__image"],
                                    ref: imageRef,
                                    clearContexts: ClearContexts
                                }],
                                [HeadingContext, { isHidden: true }],
                                [HeaderContext, { isHidden: true }],
                                [ContentContext, { isHidden: true }],
                                [FooterContext, { isHidden: true }],
                                [ButtonContext, { isHidden: true }],
                                [ButtonGroupContext, { isHidden: true }]
                            ]}
                        >
                            {children(renderProps)}
                        </Provider>
                    </OverlayTriggerStateContext.Provider>
                )}
            </Dialog>
        </BaseModal>
    );
};

/**
 * Modals focus the user’s attention exclusively on one task or piece of information via a window that sits on top of the page content.
 *
 * [View Documentation](https://hopper.workleap.design/components/Modal)
 */
const _Modal = forwardRef<HTMLDivElement, ModalProps>(Modal);
_Modal.displayName = "Modal";

export { _Modal as Modal };
