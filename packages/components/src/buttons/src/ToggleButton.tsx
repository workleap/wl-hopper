import { IconContext } from "@hopper-ui/icons";
import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { composeRenderProps, DEFAULT_SLOT, ToggleButton as RACToggleButton, useContextProps, type Key, type ToggleButtonProps as RACToggleButtonProps } from "react-aria-components";

import type { ButtonSize } from "../../buttons/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { IconListContext } from "../../icon-list/index.ts";
import { Spinner, type SpinnerProps } from "../../spinner/index.ts";
import { TextContext } from "../../typography/index.ts";
import { ClearProviders, cssModule, ensureTextWrapper, SlotProvider, useProgressVisibility, useSlot } from "../../utils/index.ts";

import { ToggleButtonContext, type ToggleButtonContextValue } from "./ToggleButtonContext.ts";

import styles from "./ToggleButton.module.css";

export const GlobalToggleButtonCssSelector = "hop-ToggleButton";

export type ToggleButtonVariant = "primary" | "secondary" | "tertiary" | "upsell";

// TODO: When ToggleButtonGroup is implemented, remove the `id` prop to use the definition from RAC instead.
export interface ToggleButtonProps extends StyledComponentProps<Omit<RACToggleButtonProps, "id">> {
    /**
     * The content to display in the button.
     */
    children: ReactNode;

    /**
     * Whether or not the toggle button takes up the width of its container.
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * A toggle button can show a loading indicator.
     */
    isLoading?: boolean;

    /**
     * A toggle button can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<ButtonSize>;

    /**
     * The props for the Spinner.
     */
    spinnerProps?: SpinnerProps;

    /**
     * The visual style of the toggle button.
     * @default "primary"
     */
    variant?: ToggleButtonVariant;

    /**
     * The id of the toggle button.
     */
    id?: Key;
}

function ToggleButton(props: ToggleButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    [props, ref] = useContextProps(props, ref, ToggleButtonContext);

    const stringFormatter = useLocalizedString();
    const { stylingProps, ...ownProps } = useStyledSystem(props as ToggleButtonContextValue);
    const [textRef, hasText] = useSlot();

    const {
        className,
        children: childrenProp,
        size: sizeProp,
        style,
        slot,
        clearContexts,
        isFluid,
        isHidden,
        isLoading,
        spinnerProps,
        variant = "primary",
        ...otherProps
    } = ownProps;

    const isProgressVisible = useProgressVisibility(isLoading);
    const size = useResponsiveValue(sizeProp) || "md";

    if (isHidden) {
        return null;
    }

    const classNames = clsx(
        GlobalToggleButtonCssSelector,
        cssModule(
            styles,
            GlobalToggleButtonCssSelector,
            variant,
            size,
            isFluid && "fluid",
            isProgressVisible && "loading",
            !hasText && "icon-only"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    if (!hasText && (!props["aria-label"] && !props["aria-labelledby"])) {
        console.warn("An aria-label or aria-labelledby prop is required for accessibility.");
    }

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    const { className: spinnerClassName, ...otherSpinnerProps } = spinnerProps ?? {};
    const spinnerClassNames = clsx(styles["hop-ToggleButton__Spinner"], spinnerClassName);

    return (
        <ClearProviders values={clearContexts}>
            <SlotProvider
                values={[
                    [IconListContext, {
                        slots: {
                            [DEFAULT_SLOT]: {
                                size: size,
                                className: styles["hop-ToggleButton__icon-list"]
                            },
                            "end-icon": {
                                size: size,
                                className: styles["hop-ToggleButton__end-icon-list"]
                            }
                        }
                    }],
                    [IconContext, {
                        slots: {
                            [DEFAULT_SLOT]: {
                                size: size,
                                className: styles["hop-ToggleButton__icon"]
                            },
                            "end-icon": {
                                size: size,
                                className: styles["hop-ToggleButton__end-icon"]
                            }
                        }
                    }],
                    [TextContext, {
                        className: styles["hop-ToggleButton__text"],
                        size: size,
                        ref: textRef
                    }]
                ]}
            >
                <RACToggleButton
                    ref={ref}
                    className={classNames}
                    style={mergedStyles}
                    slot={slot ?? undefined}
                    isDisabled={isLoading}
                    {...otherProps}
                >
                    {buttonRenderProps => {
                        return <>
                            {children(buttonRenderProps)}
                            {isProgressVisible && (
                                <Spinner
                                    aria-label={stringFormatter.format("Button.spinnerAriaLabel")}
                                    size={size}
                                    className={spinnerClassNames}
                                    {...otherSpinnerProps}
                                />
                            )}
                        </>;
                    }}
                </RACToggleButton>
            </SlotProvider>
        </ClearProviders>
    );
}

/**
 * Offer a similar experience as a checkbox or radio with the appearance of a button.
 *
 * [View Documentation](https://hopper.workleap.design/components/ToggleButton)
 */
const _ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(ToggleButton);
_ToggleButton.displayName = "ToggleButton";

export { _ToggleButton as ToggleButton };
