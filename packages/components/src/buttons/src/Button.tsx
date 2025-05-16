import { IconContext } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    slot as slotFn,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type ForwardedRef, forwardRef, useEffect, useState } from "react";
import {
    composeRenderProps,
    DEFAULT_SLOT,
    Button as RACButton,
    type ButtonProps as RACButtonProps,
    useContextProps
} from "react-aria-components";

import { useFormProps } from "../../Form/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { IconListContext } from "../../IconList/index.ts";
import { Spinner, type SpinnerProps } from "../../Spinner/index.ts";
import { TextContext } from "../../typography/Text/index.ts";
import {
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper,
    SlotProvider,
    useSlot
} from "../../utils/index.ts";
import type { ButtonSize, ButtonVariant } from "../utils/index.ts";

import { ButtonContext } from "./ButtonContext.ts";

import styles from "./Button.module.css";

export const GlobalButtonCssSelector = "hop-Button";

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
    props = useFormProps(props);
    const [isProgressVisible, setIsProgressVisible] = useState(false);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const stringFormatter = useLocalizedString();

    const {
        className,
        children: childrenProp,
        size: sizeProp,
        isFluid: isFluidProp,
        variant = "primary",
        isLoading,
        style: styleProp,
        spinnerProps,
        ...otherProps
    } = ownProps;

    const [textRef, hasText] = useSlot();

    const size = useResponsiveValue(sizeProp) ?? "md";
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

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

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (isLoading) {
            timeout = setTimeout(() => {
                setIsProgressVisible(true);
            }, 1000);
        } else {
            setIsProgressVisible(false);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isLoading, setIsProgressVisible]);

    return (
        <SlotProvider
            values={[
                [IconListContext, {
                    slots: {
                        [DEFAULT_SLOT]: {
                            size: size,
                            className: styles["hop-Button__icon-list"]
                        },
                        "end-icon": {
                            size: size,
                            className: styles["hop-Button__end-icon-list"]
                        }
                    }
                }],
                [IconContext, {
                    slots: {
                        [DEFAULT_SLOT]: {
                            size: size,
                            className: styles["hop-Button__icon"]
                        },
                        "end-icon": {
                            size: size,
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
                                size={size}
                                className={spinnerClassNames}
                                {...otherSpinnerProps}
                            />
                        )}
                    </>;
                }}
            </RACButton>
        </SlotProvider>
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
