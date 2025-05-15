import { IconContext } from "@hopper-ui/icons";
import { type ResponsiveProp, type StyledComponentProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import { filterDOMProps } from "@react-aria/utils";
import { type CSSProperties, type ForwardedRef, forwardRef, type NamedExoticComponent, useContext, useRef } from "react";
import {
    composeRenderProps,
    DEFAULT_SLOT,
    SelectContext as RACSelectContext,
    SelectValueContext as RACSelectValueContext,
    type SelectValueProps as RACSelectValueProps,
    SelectStateContext,
    useContextProps, useSlottedContext
} from "react-aria-components";

import { AvatarContext, type AvatarProps } from "../../Avatar/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { Text, TextContext } from "../../typography/index.ts";
import { ClearContainerSlots, composeClassnameRenderProps, cssModule, type FieldSize, type SizeAdapter, SlotProvider, useIsOverflow, useRenderProps } from "../../utils/index.ts";

import styles from "./SelectValue.module.css";

export const GlobalSelectValueCssSelector = "hop-SelectValue";

export interface SelectValueProps<T extends object> extends StyledComponentProps<RACSelectValueProps<T>> {
    /**
     * The size of the select value.
     * @default "sm"
     */
    size?: ResponsiveProp<FieldSize>;
}

const SelectValueToAvatarSizeAdapter = {
    sm: "xs",
    md: "md"
} as const satisfies SizeAdapter<FieldSize, AvatarProps["size"]>;

function SelectValue<T extends object>(props: SelectValueProps<T>, ref: ForwardedRef<HTMLSpanElement>) {
    [props, ref] = useContextProps(props, ref, RACSelectValueContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        size: sizeProp,
        style: styleProp,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "sm";

    const textRef = useRef<HTMLSpanElement>(null);
    const refForOverflowCheck = textRef.current ? textRef : ref;
    const isOverflow = useIsOverflow(refForOverflowCheck);
    const state = useContext(SelectStateContext);
    const { placeholder } = useSlottedContext(RACSelectContext)!;
    const selectedItem = state?.selectedKey != null
        ? state.collection.getItem(state.selectedKey)
        : null;

    const stringFormatter = useLocalizedString();
    const textValue = state?.selectedItem?.textValue;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalSelectValueCssSelector,
        cssModule(
            styles,
            "hop-SelectValue"
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
        ...otherProps,
        className: classNames,
        defaultChildren: textValue || placeholder || stringFormatter.format("Select.placeholder"),
        style,
        values: {
            selectedItem: state?.selectedItem?.value as T ?? null,
            selectedText: textValue ?? null,
            isPlaceholder: !selectedItem
        }
    });

    const DOMProps = filterDOMProps(ownProps);

    return (
        <ClearContainerSlots>
            <Text
                ref={ref}
                {...DOMProps}
                {...renderProps}
                size={size}
                title={isOverflow ? textValue : undefined}
                data-placeholder={!selectedItem || undefined}
            >
                <SlotProvider values={[
                    [AvatarContext, {
                        className: styles["hop-SelectValue__avatar"],
                        size: SelectValueToAvatarSizeAdapter[size]
                    }],
                    [TextContext, {
                        slot: "label",
                        className: styles["hop-SelectValue__text"],
                        ref: textRef
                    }],
                    [IconContext, {
                        slots: {
                            [DEFAULT_SLOT]: {
                                className: styles["hop-SelectValue__icon"],
                                size: size
                            },
                            "end-icon": {
                                className: styles["hop-SelectValue__end-icon"],
                                size: size
                            }
                        }
                    }]
                ]}
                >
                    {renderProps.children}
                </SlotProvider>
            </Text>
        </ClearContainerSlots>
    );
}

/**
 * A select value displays the selected value of a select.
 *
 * [View Documentation](https://hopper.workleap.design/components/Select)
 */
const _SelectValue = forwardRef(SelectValue) as <T extends object>(
    props: SelectValueProps<T> & { ref?: ForwardedRef<HTMLSpanElement> }
) => ReturnType<typeof SelectValue>;
(_SelectValue as NamedExoticComponent).displayName = "SelectValue";

export { _SelectValue as SelectValue };

