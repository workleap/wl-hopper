import { BulletIcon, IconContext } from "@hopper-ui/icons";
import {
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { mergeProps } from "react-aria";
import {
    composeRenderProps,
    useContextProps
} from "react-aria-components";

import { IconListContext } from "../../icon-list/index.ts";
import { TextContext } from "../../typography/index.ts";
import {
    ClearContainerSlots,
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper,
    SlotProvider,
    useRenderProps,
    type InteractionProps
} from "../../utils/index.ts";

import type { RadioProps } from "./Radio.tsx";
import { RadioContext } from "./RadioContext.ts";

import styles from "./DecorativeRadio.module.css";

export const GlobalDecorativeRadioCssSelector = "hop-DecorativeRadio";

export interface DecorativeRadioProps extends RadioProps, InteractionProps {}

function DecorativeRadio(props: DecorativeRadioProps, ref: ForwardedRef<HTMLLabelElement>) {
    [props, ref] = useContextProps(props, ref, RadioContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        size: sizeProp = "md",
        slot,
        style: styleProp,
        isSelected,
        isPressed,
        isHovered,
        isFocused,
        isFocusVisible,
        isDisabled,
        isReadOnly,
        isInvalid,
        isRequired,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    const classNames = composeClassnameRenderProps(
        className,
        GlobalDecorativeRadioCssSelector,
        cssModule(
            styles,
            "hop-DecorativeRadio",
            size
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    }) as CSSProperties;

    const renderProps = useRenderProps({
        ...props,
        className: classNames,
        style,
        children: children,
        values: {
            isSelected: isSelected || false,
            isPressed: isPressed || false,
            isHovered: isHovered || false,
            isFocused: isFocused || false,
            isFocusVisible: isFocusVisible || false,
            isDisabled: isDisabled || false,
            isReadOnly: isReadOnly || false,
            isInvalid: isInvalid || false,
            isRequired: isRequired || false
        }
    });

    const radioIconClassName = styles["hop-DecorativeRadio__bullet"];

    return (
        <label
            ref={ref}
            slot={slot || undefined}
            data-selected={isSelected || undefined}
            data-pressed={isPressed || undefined}
            data-hovered={isHovered || undefined}
            data-focused={isFocused || undefined}
            data-focus-visible={isFocusVisible || undefined}
            data-disabled={isDisabled || undefined}
            data-readonly={isReadOnly || undefined}
            data-invalid={isInvalid || undefined}
            data-required={isRequired || undefined}
            aria-hidden
            {...mergeProps(renderProps, otherProps)}
        >
            <div className={styles["hop-DecorativeRadio__box"]}>
                <BulletIcon size={size} className={radioIconClassName} />
            </div>
            <ClearContainerSlots>
                <SlotProvider
                    values={[
                        [TextContext, {
                            className: styles["hop-DecorativeRadio__text"],
                            size: size
                        }],
                        [IconListContext, {
                            className: styles["hop-DecorativeRadio__icon-list"],
                            size: size
                        }],
                        [IconContext, {
                            className: styles["hop-DecorativeRadio__icon"],
                            size: size
                        }]
                    ]}
                >
                    {renderProps.children}
                </SlotProvider>
            </ClearContainerSlots>
        </label>
    );
}

/**
 * The DecorativeRadio component indicates the selection state of an option without using a native radio input. To be used for visual purposes only.
 */
const _DecorativeRadio = forwardRef<HTMLLabelElement, DecorativeRadioProps>(DecorativeRadio);
_DecorativeRadio.displayName = "DecorativeRadio";

export { _DecorativeRadio as DecorativeRadio };
