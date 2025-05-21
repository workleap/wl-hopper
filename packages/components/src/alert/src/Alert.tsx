import { type ResponsiveProp, type StyledComponentProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { chain } from "react-aria";
import { composeRenderProps, Dialog, type DialogProps, Provider, useContextProps } from "react-aria-components";

import { Button, ButtonGroup, CloseButton } from "../../buttons/index.ts";
import { ContentContext } from "../../layout/index.ts";
import { BaseModal, type BaseModalProps } from "../../modal/index.ts";
import { HeadingContext } from "../../typography/index.ts";
import { cssModule } from "../../utils/index.ts";

import { AlertContext } from "./AlertContext.ts";

import styles from "./Alert.module.css";

export const GlobalAlertCssSelector = "hop-Alert";

export interface AlertProps extends StyledComponentProps<DialogProps> {
    /**
     * The button to focus by default when the alert open.
     */
    autoFocusButton?: "primary" | "secondary" | "cancel";
    /**
     * The cancel button label.
     */
    cancelButtonLabel?: string;
    /**
     * Whether or not the dialog should close on outside interactions.
     * @default true
     */
    isDismissable?: boolean;
    /**
     * Called when the cancel button is clicked
     */
    onCancelButtonClick?: () => void;
    /**
     * Called when the primary button is clicked.
     */
    onPrimaryButtonClick?: () => void;
    /**
     * Called when the secondary button is clicked.
     */
    onSecondaryButtonClick?: () => void;
    /**
     * Whether or not the primary button is disabled.
     */
    primaryButtonDisabled?: boolean;
    /**
     * The primary button label.
     */
    primaryButtonLabel: string;
    /**
     * Whether or not the secondary button is disabled.
     */
    secondaryButtonDisabled?: boolean;
    /**
     * The secondary button label.
     */
    secondaryButtonLabel?: string;
    /**
    * The visual style of the Alert.
    * @default "confirmation"
    */
    variant?: "confirmation" | "destructive";
    /**
     * The size of the Alert.
     * @default "md"
     */
    size?: ResponsiveProp<"sm" | "md">;
    /**
     * Additional props to render on the wrapper element.
     */
    overlayProps?: Partial<BaseModalProps>;
    /**
     * Whether or not the Alert is loading.
     */
    isLoading?: boolean;
}

function Alert(props:AlertProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AlertContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        style,
        slot,
        size: sizeProp,
        autoFocusButton,
        cancelButtonLabel,
        isDismissable = true,
        onCancelButtonClick,
        onPrimaryButtonClick,
        onSecondaryButtonClick,
        primaryButtonDisabled,
        primaryButtonLabel,
        secondaryButtonDisabled,
        secondaryButtonLabel,
        variant = "confirmation",
        overlayProps,
        isLoading,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = clsx(
        GlobalAlertCssSelector,
        cssModule(
            styles,
            GlobalAlertCssSelector,
            variant
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
            size={size}
            isDismissable={isDismissable && !isLoading}
            isKeyboardDismissDisabled={isDismissable && !isLoading}
            {...overlayProps}
        >
            <Dialog
                role="alertdialog"
                ref={ref}
                slot={slot}
                style={mergedStyles}
                className={classNames}
                {...otherProps}
            >
                {renderProps => (
                    <>
                        {isDismissable && (
                            <CloseButton
                                isDisabled={isLoading}
                                className={styles["hop-Alert__close"]}
                            />
                        )}
                        <Provider
                            values={[
                                [HeadingContext, {
                                    className: styles["hop-Alert__heading"],
                                    size: "lg",
                                    slot: "title"
                                }],
                                [ContentContext, {
                                    className: styles["hop-Alert__content"]
                                }]
                            ]}
                        >
                            {children(renderProps)}
                        </Provider>
                        <ButtonGroup align="end" className={styles["hop-Alert__button-group"]}>
                            {cancelButtonLabel &&
                                <Button
                                    onPress={() => chain(onCancelButtonClick?.(), renderProps.close())}
                                    variant="secondary"
                                    isDisabled={isLoading}
                                    autoFocus={autoFocusButton === "cancel"}
                                >
                                    {cancelButtonLabel}
                                </Button>
                            }
                            {secondaryButtonLabel &&
                                <Button
                                    onPress={() => chain(onSecondaryButtonClick?.(), renderProps.close())}
                                    variant="secondary"
                                    isDisabled={isLoading || secondaryButtonDisabled}
                                    autoFocus={autoFocusButton === "secondary"}
                                >
                                    {secondaryButtonLabel}
                                </Button>
                            }
                            <Button
                                variant={variant === "confirmation" ? "primary" : "danger"}
                                isLoading={isLoading}
                                isDisabled={primaryButtonDisabled}
                                autoFocus={autoFocusButton === "primary"}
                                onPress={() => chain(onPrimaryButtonClick?.(), renderProps.close)}
                            >
                                {primaryButtonLabel}
                            </Button>
                        </ButtonGroup>
                    </>
                )}
            </Dialog>
        </BaseModal>
    );
}

/**
 * An Alert is a “conversation” between the system and the user. It is prompted when the system needs input from the user or to give the user urgent information concerning their current workflow.
 *
 * [View Documentation](https://hopper.workleap.design/components/Alert)
 */
const _Alert = forwardRef<HTMLDivElement, AlertProps>(Alert);
_Alert.displayName = "Alert";

export { _Alert as Alert };
