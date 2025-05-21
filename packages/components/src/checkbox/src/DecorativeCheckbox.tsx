import { CheckmarkIcon, IconContext, MinusIcon } from "@hopper-ui/icons";
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

import type { CheckboxProps } from "./Checkbox.tsx";
import { CheckboxContext } from "./CheckboxContext.ts";

import styles from "./DecorativeCheckbox.module.css";

export const GlobalDecorativeCheckboxCssSelector = "hop-DecorativeCheckbox";

export interface DecorativeCheckboxProps extends Omit<CheckboxProps, "onChange">, InteractionProps {}

function DecorativeCheckbox(props: DecorativeCheckboxProps, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref as ForwardedRef<HTMLLabelElement>, CheckboxContext);
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
        isIndeterminate,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    const classNames = composeClassnameRenderProps(
        className,
        GlobalDecorativeCheckboxCssSelector,
        cssModule(
            styles,
            "hop-DecorativeCheckbox",
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
            isRequired: isRequired || false,
            isIndeterminate: isIndeterminate || false
        }
    });

    const checkboxIconClassName = styles["hop-DecorativeCheckbox__check"];
    const icon = isIndeterminate ?
        <MinusIcon size="sm" className={checkboxIconClassName} /> :
        <CheckmarkIcon size="sm" className={checkboxIconClassName} />;

    return (
        <div
            ref={ref as ForwardedRef<HTMLDivElement>}
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
            {...mergeProps(renderProps, otherProps)}
        >
            <div className={styles["hop-DecorativeCheckbox__box"]}>{icon}</div>
            <ClearContainerSlots>
                <SlotProvider
                    values={[
                        [TextContext, {
                            className: styles["hop-DecorativeCheckbox__text"],
                            size: size
                        }],
                        [IconListContext, {
                            className: styles["hop-DecorativeCheckbox__icon-list"],
                            size: size
                        }],
                        [IconContext, {
                            className: styles["hop-DecorativeCheckbox__icon"],
                            size: size
                        }]
                    ]}
                >
                    {renderProps.children}
                </SlotProvider>
            </ClearContainerSlots>
        </div>
    );
}

/**
 * The DecorativeCheckbox component indicates the selection state of an option without using a native radio input. To be used for visual purposes only.
 */
const _DecorativeCheckbox = forwardRef<HTMLElement, DecorativeCheckboxProps>(DecorativeCheckbox);
_DecorativeCheckbox.displayName = "DecorativeCheckbox";

export { _DecorativeCheckbox as DecorativeCheckbox };
