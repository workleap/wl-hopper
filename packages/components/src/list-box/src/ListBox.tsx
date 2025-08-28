import { type ResponsiveProp, type StyledComponentProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import { useLoadMore } from "@react-aria/utils";
import clsx from "clsx";
import { type ForwardedRef, forwardRef, type NamedExoticComponent } from "react";
import { Collection, composeRenderProps, type ListBoxRenderProps, ListBox as RACListBox, type ListBoxProps as RACListBoxProps, useContextProps } from "react-aria-components";

import { HeaderContext } from "../../header/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { Text, type TextSize } from "../../typography/index.ts";
import { ClearContainerSlots, composeClassnameRenderProps, cssModule, isFunction, type SizeAdapter, SlotProvider } from "../../utils/index.ts";

import { ListBoxContext } from "./ListBoxContext.ts";
import { ListBoxItem, type ListBoxItemProps, type ListBoxItemSize, type SelectionIndicator } from "./ListBoxItem.tsx";
import { ListBoxItemContext } from "./ListBoxItemContext.ts";
import { ListBoxSectionContext } from "./ListBoxSectionContext.ts";

import styles from "./ListBox.module.css";

export const GlobalListBoxCssSelector = "hop-ListBox";
export const GlobalListBoxEmptyItemCssSelector = "hop-ListBox__empty-item";

export interface ListBoxProps<T> extends StyledComponentProps<Omit<RACListBoxProps<T>, "orientation | layout">> {
    /**
     * Whether or not the ListBox is 100% of its container's width.
     */
    isFluid?: ResponsiveProp<boolean>;
    /**
     * Whether or not the ListBox is in an invalid state.
     */
    isInvalid?: boolean;
    /**
     * Whether data is currently being loaded.
     * */
    isLoading?: boolean;
    /**
     * Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.
     * */
    onLoadMore?: () => void;
    /**
     * The selection indicator to use. Only available if the selection mode is not "none".
     * When set to "input", the selection indicator will be either a radio or checkbox based on the selection mode.
     * @default "check"
     */
    selectionIndicator?: SelectionIndicator;
    /**
     * A ListBox can vary in size.
     * @default "sm"
     */
    size?: ResponsiveProp<ListBoxItemSize>;

    /**
     * The props of the ListBoxItem.
     */
    loadingListBoxItemProps?: ListBoxItemProps<T>;
}

const ListBoxToTextSizeAdapter = {
    xs: "sm",
    sm: "sm",
    md: "sm",
    lg: "md"
} as const satisfies SizeAdapter<ListBoxItemSize, TextSize>;

function ListBox<T extends object>(props: ListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, ListBoxContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        disallowEmptySelection: disallowEmptySelectionProp,
        isFluid: isFluidProp,
        isInvalid,
        isLoading,
        onLoadMore,
        renderEmptyState,
        size: sizeProp,
        style: styleProp,
        selectionIndicator = "check",
        selectionMode = "single",
        loadingListBoxItemProps,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "sm";
    const isFluid = useResponsiveValue(isFluidProp) ?? false;
    const disallowEmptySelection = disallowEmptySelectionProp ?? (selectionIndicator === "input" && selectionMode === "single");
    const stringFormatter = useLocalizedString();

    const classNames = composeClassnameRenderProps(
        className,
        GlobalListBoxCssSelector,
        cssModule(
            styles,
            "hop-ListBox",
            size,
            isFluid && "fluid"
        ),
        stylingProps.className
    );

    const emptyItemClassNames = clsx(
        GlobalListBoxEmptyItemCssSelector,
        cssModule(
            styles,
            "hop-ListBox__empty-item",
            size
        )
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    useLoadMore({ isLoading, onLoadMore }, ref);

    const renderChildren = () => {
        if (props.items) {
            return (
                <Collection items={props.items}>
                    {item => (isFunction(children) ? children(item) : children)}
                </Collection>
            );
        }

        if (isFunction(children)) {
            console.warn("ListBox: Children should not be a function when items are not provided.");

            return null;
        }

        return children;
    };

    const handleRenderEmptyState = (renderProps: ListBoxRenderProps) => {
        let result = null;
        if (renderEmptyState && isFunction(renderEmptyState)) {
            result = renderEmptyState(renderProps);

            if (result) {
                return (
                    <ClearContainerSlots>
                        <Text className={emptyItemClassNames} size={ListBoxToTextSizeAdapter[size]}>{result}</Text>
                    </ClearContainerSlots>
                );
            }
        }

        return result;
    };

    return (
        <SlotProvider
            values={[
                [HeaderContext, {
                    className: styles["hop-ListBox__section-header"]
                }],
                [ListBoxSectionContext, {
                    className: styles["hop-ListBox__section"]
                }],
                [ListBoxItemContext, {
                    className: styles["hop-ListBox__item"],
                    size: size,
                    selectionIndicator: selectionIndicator,
                    isInvalid: isInvalid
                }]
            ]}
        >
            <RACListBox
                ref={ref}
                className={classNames}
                disallowEmptySelection={disallowEmptySelection}
                renderEmptyState={handleRenderEmptyState}
                selectionMode={selectionMode}
                style={style}
                data-loading={isLoading}
                shouldSelectOnPressUp
                {...otherProps}
            >
                {renderChildren()}
                {isLoading && Array.from({ length: 5 }).map((_, index) => {
                    return (
                        <ListBoxItem
                            key={`loadingListItem_${index.toString()}`}
                            id={`loadingListItem_${index.toString()}`}
                            isLoading={isLoading}
                            size={size}
                            textValue={stringFormatter.format("ListBoxItem.loadingTextValue")}
                            {...loadingListBoxItemProps}
                        />
                    );
                })}
            </RACListBox>
        </SlotProvider>
    );
}

/**
 * A listbox is a list of interactive options that appears when users interact with an element or perform a specific action.
 *
 * [View Documentation](https://hopper.workleap.design/components/ListBox)
 */
const _ListBox = forwardRef(ListBox) as <T>(
    props: ListBoxProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ListBox>;
(_ListBox as NamedExoticComponent).displayName = "ListBox";

export { _ListBox as ListBox };

