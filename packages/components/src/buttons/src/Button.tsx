import { IconContext, type IconSize } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    slot as slotFn,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type ForwardedRef, forwardRef } from "react";
import {
    composeRenderProps,
    DEFAULT_SLOT,
    Button as RACButton,
    type ButtonProps as RACButtonProps,
    useContextProps
} from "react-aria-components";

import { useFormProps } from "../../form/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { IconListContext } from "../../icon-list/index.ts";
import { Spinner, type SpinnerProps } from "../../spinner/index.ts";
import { TextContext } from "../../typography/index.ts";
import {
    ClearProviders,
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper,
    type FieldSize,
    type SizeAdapter,
    SlotProvider,
    useProgressVisibility,
    useSlot
} from "../../utils/index.ts";
import type { ButtonSize, ButtonVariant } from "../utils/index.ts";

import { ButtonContext, type ButtonContextValue } from "./ButtonContext.ts";

import styles from "./Button.module.css";

export const GlobalButtonCssSelector = "hop-Button";

export const ButtonToIconSizeAdapter: SizeAdapter<ButtonSize, IconSize> = {
    xs: "sm",
    sm: "md",
    md: "md"
};

export const ButtonToFieldSizeAdapter: SizeAdapter<ButtonSize, FieldSize> = {
    xs: "sm",
    sm: "sm",
    md: "md"
};

export interface ButtonProps extends StyledComponentProps<Omit<RACButtonProps, "isPending">> {
    /**
     * The visual style of the button.
     * @default "primary"
     */
    variant?: ButtonVariant;

    /**
     * A button can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<ButtonSize>;

    /**
     * Whether or not the button takes up the width of its container.
     */
    isFluid?: ResponsiveProp<boolean>;

    /** A button can show a loading indicator.*/
    isLoading?: boolean;

    /** The props for the Spinner. */
    spinnerProps?: SpinnerProps;
}

function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    [props, ref] = useContextProps(props, ref, ButtonContext);
    const initialSize = useResponsiveValue(props.size);
    props = useFormProps({
        ...props,
        size: initialSize ? ButtonToFieldSizeAdapter[initialSize] : undefined
    });

    const { stylingProps, ...ownProps } = useStyledSystem(props as ButtonContextValue);
    const stringFormatter = useLocalizedString();

    const {
        className,
        children: childrenProp,
        isFluid: isFluidProp,
        variant = "primary",
        isLoading,
        size: sizeProp,
        style: styleProp,
        spinnerProps,
        isHidden,
        clearContexts,
        ...otherProps
    } = ownProps;

    const isProgressVisible = useProgressVisibility(isLoading);

    const [textRef, hasText] = useSlot();

    const size = useResponsiveValue(sizeProp) ?? "md";
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    if (isHidden) {
        return null;
    }

    const classNames = composeClassnameRenderProps(
        className,
        GlobalButtonCssSelector,
        cssModule(
            styles,
            "hop-Button",
            variant,
            size,
            isFluid && "fluid",
            isProgressVisible && "loading",
            !hasText && "icon-only"
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    const { className: spinnerClassName, ...otherSpinnerProps } = spinnerProps ?? {};
    const spinnerClassNames = clsx(styles["hop-Button__Spinner"], spinnerClassName);

    if (!hasText && (!props["aria-label"] && !props["aria-labelledby"])) {
        console.warn("An aria-label or aria-labelledby prop is required for accessibility.");
    }

    const iconSize = ButtonToIconSizeAdapter[size];

    return (
        <ClearProviders values={clearContexts}>
            <SlotProvider
                values={[
                    [IconListContext, {
                        slots: {
                            [DEFAULT_SLOT]: {
                                size: iconSize,
                                className: styles["hop-Button__icon-list"]
                            },
                            "end-icon": {
                                size: iconSize,
                                className: styles["hop-Button__end-icon-list"]
                            }
                        }
                    }],
                    [IconContext, {
                        slots: {
                            [DEFAULT_SLOT]: {
                                size: iconSize,
                                className: styles["hop-Button__icon"]
                            },
                            "end-icon": {
                                size: iconSize,
                                className: styles["hop-Button__end-icon"]
                            }
                        }
                    }],
                    [TextContext, {
                        className: styles["hop-Button__text"],
                        size: size,
                        ref: textRef
                    }]
                ]}
            >
                <RACButton
                    ref={ref}
                    slot={props.slot || undefined}
                    className={classNames}
                    style={style}
                    isPending={isLoading}
                    {...otherProps}
                >
                    {buttonRenderProps => {
                        return <>
                            {children(buttonRenderProps)}
                            {isProgressVisible && (
                                <Spinner
                                    aria-label={stringFormatter.format("Button.spinnerAriaLabel")}
                                    size={iconSize}
                                    className={spinnerClassNames}
                                    {...otherSpinnerProps}
                                />
                            )}
                        </>;
                    }}
                </RACButton>
            </SlotProvider>
        </ClearProviders>
    );
}

/**
 * Buttons are used to initialize an action. Button labels express what action will occur when the user interacts with it.
 * [View Documentation](https://hopper.workleap.design/components/Button)
 *
 */
const _Button = slotFn("button", forwardRef(Button));

_Button.displayName = "Button";

export { _Button as Button };
