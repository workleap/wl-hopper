import { IconContext } from "@hopper-ui/icons";
import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { forwardRef, type ForwardedRef, type ReactNode } from "react";
import {
    Autocomplete,
    Button,
    composeRenderProps,
    ButtonContext as RACButtonContext,
    Select as RACSelect,
    TextContext as RACTextContext,
    useContextProps,
    useFilter,
    type AutocompleteProps as RACAutocompleteProps,
    type ButtonProps as RACButtonProps,
    type SelectProps as RACSelectProps,
    type SelectValueRenderProps
} from "react-aria-components";

import { BadgeContext } from "../../badge/index.ts";
import { ErrorMessage } from "../../error-message/index.ts";
import { useFormProps } from "../../form/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { SearchField, type SearchFieldProps } from "../../inputs/index.ts";
import { Footer } from "../../layout/index.ts";
import { ListBox, type ListBoxProps, type SelectionIndicator } from "../../list-box/index.ts";
import { Popover, type PopoverProps } from "../../overlays/index.ts";
import { ToggleArrow } from "../../toggle-arrow/index.ts";
import { FieldLabel, TextContext } from "../../typography/index.ts";
import { ClearContainerSlots, ClearProviders, composeClassnameRenderProps, cssModule, ensureTextWrapper, SlotProvider, type FieldProps, type MenuAlignment, type MenuDirection } from "../../utils/index.ts";

import { SelectContext } from "./SelectContext.ts";
import { SelectValue } from "./SelectValue.tsx";

import styles from "./SelectInternal.module.css";

export const GlobalSelectCssSelector = "hop-Select";

export type ValueRenderProps<T> = SelectValueRenderProps<T> & { defaultChildren: ReactNode };
export type SelectTriggerProps = StyledComponentProps<RACButtonProps>;
export type SelectAutocompleteProps = Omit<RACAutocompleteProps, "children">;
export interface InternalSelectProps<T extends object, M extends "single" | "multiple" = "single"> extends StyledComponentProps<Omit<RACSelectProps<T, M>, "children">>, FieldProps {
    /**
     * The alignment of the menu.
     * @default "start"
     */
    align?: ResponsiveProp<MenuAlignment>;
    /**
     * The items of the Select.
     */
    children: ReactNode | ((item: T) => ReactNode);
    /**
     * The direction that the menu should open.
     * @default "bottom"
     */
    direction?: ResponsiveProp<MenuDirection>;
    /**
     * The footer of the select.
     */
    footer?: ReactNode;
    /**
     * If `true`, the select menu will not be the width of the trigger and instead be the width of its contents.
     */
    isAutoMenuWidth?: boolean;
    /**
     * If `true`, the select will take all available width.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;
    /**
     * Item objects in the collection.
     */
    items?: Iterable<T>;
    /**
     * Whether data is currently being loaded.
     * */
    isLoading?: boolean;
    /**
     * The list box props.
     */
    listBoxProps?: ListBoxProps<T>;
    /**
     * Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.
     * */
    onLoadMore?: () => void;
    /**
     * The placeholder text when the select is empty.
     */
    placeholder?: string;
    /**
     * The props for the popover.
     */
    popoverProps?: PopoverProps;
    /**
     * An icon or text to display at the start of the select trigger.
     */
    prefix?: ReactNode;
    /**
     * A function to render the value of the select. It will render the selected item's text by default.
     */
    renderValue?: (valueRenderProps: ValueRenderProps<T>) => ReactNode;
    /**
     * The selection indicator to use. Only available if the selection mode is not "none".
     * When set to "input", the selection indicator will be either a radio or checkbox based on the selection mode.
     * @default "check"
     */
    selectionIndicator?: SelectionIndicator;
    /**
     * Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient room for it to render completely.
     */
    shouldFlip?: boolean;
    /**
     * The props for the select's trigger.
     */
    triggerProps?: SelectTriggerProps;
    /**
     * Whether to show a search input in the dropdown to allow for filtering.
     */
    isFilterable?: boolean;
    /**
     * The props for the autocomplete component.
     */
    autocompleteProps?: SelectAutocompleteProps;
    /**
     * The props for the search field.
     */
    searchFieldProps?: SearchFieldProps;
}

function InternalSelect<T extends object>(props: InternalSelectProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, SelectContext);
    props = useFormProps(props);
    const { contains } = useFilter({ sensitivity: "base" });
    const stringFormatter = useLocalizedString();

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        align: alignProp,
        autocompleteProps,
        className,
        children,
        contextualHelp,
        description,
        direction: directionProp,
        errorMessage,
        footer,
        isAutoMenuWidth,
        isFluid: isFluidProp,
        isInvalid,
        isLoading,
        isRequired,
        isFilterable,
        items,
        label,
        listBoxProps,
        necessityIndicator,
        onLoadMore,
        popoverProps,
        prefix,
        renderValue,
        searchFieldProps,
        selectionIndicator,
        shouldFlip,
        size: sizeProp,
        style: styleProp,
        triggerProps,
        ...otherProps
    } = ownProps;
    const { stylingProps: triggerStylingProps, ...triggerOwnProps } = useStyledSystem(triggerProps ?? {});
    const {
        className: triggerClassName,
        style: triggerStyleProp,
        ...otherTriggerProps
    } = triggerOwnProps;

    const { stylingProps: searchFieldStylingProps, ...searchFieldOwnProps } = useStyledSystem(searchFieldProps ?? {});
    const {
        className: searchFieldClassName,
        ...otherSearchFieldProps
    } = searchFieldOwnProps;

    const {
        className: popoverContainerClassName,
        ...otherPopoverContainerProps
    } = popoverProps?.containerProps ?? {};

    const size = useResponsiveValue(sizeProp) ?? "md";
    const isFluid = useResponsiveValue(isFluidProp) ?? false;
    const align = useResponsiveValue(alignProp) ?? "start";
    const direction = useResponsiveValue(directionProp) ?? "bottom";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalSelectCssSelector,
        cssModule(
            styles,
            "hop-Select",
            isFluid && "fluid",
            size
        ),
        stylingProps.className
    );

    const buttonClassNames = composeClassnameRenderProps(
        triggerClassName,
        cssModule(
            styles,
            "hop-Select__button",
            size
        ),
        triggerStylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const triggerStyle = composeRenderProps(triggerStyleProp, prev => {
        return {
            ...triggerStylingProps.style,
            ...prev
        };
    });

    const searchFieldClassNames = composeClassnameRenderProps(
        searchFieldClassName,
        cssModule(
            styles,
            "hop-Select__search-input"
        ),
        searchFieldStylingProps.className
    );

    const popoverContainerClassNames = cssModule(
        styles,
        "hop-Select__popover",
        popoverContainerClassName
    );

    const prefixMarkup = prefix ? (
        <SlotProvider values={[
            [TextContext, { size, className: styles["hop-Select__prefix"] }],
            [IconContext, { size, className: styles["hop-Select__prefix"] }]
        ]}
        >
            <ClearContainerSlots>
                {ensureTextWrapper(prefix)}
            </ClearContainerSlots>
        </SlotProvider>
    ) : null;

    const footerMarkup = footer ? (
        <ClearProviders
            values={[
                RACTextContext,
                TextContext,
                RACButtonContext
            ]}
        >
            <SlotProvider values={[
                [TextContext, {
                    size
                }]
            ]}
            >
                <Footer>
                    {ensureTextWrapper(footer)}
                </Footer>

            </SlotProvider>
        </ClearProviders>
    ) : null;

    const listBoxMarkup = (
        <SlotProvider values={[
            [BadgeContext, {
                variant: "secondary"
            }]
        ]}
        >
            <ListBox
                size={size}
                isInvalid={isInvalid}
                items={items}
                isLoading={isLoading}
                onLoadMore={onLoadMore}
                selectionIndicator={selectionIndicator}
                {...listBoxProps}
            >
                {children}
            </ListBox>
        </SlotProvider>
    );

    return (
        <RACSelect
            ref={ref}
            className={classNames}
            style={style}
            isInvalid={isInvalid}
            isRequired={isRequired}
            {...otherProps}
        >
            {selectRenderProps => {
                const { isOpen } = selectRenderProps;

                return (
                    <>
                        <FieldLabel
                            className={styles["hop-Select__label"]}
                            contextualHelp={contextualHelp}
                            isRequired={isRequired}
                            necessityIndicator={necessityIndicator}
                        >
                            {label}
                        </FieldLabel>
                        <Popover
                            isAutoWidth={isAutoMenuWidth}
                            isNonDialog
                            placement={`${direction} ${align}`}
                            shouldFlip={shouldFlip}
                            {...popoverProps}
                            containerProps={{
                                ...otherPopoverContainerProps,
                                className: popoverContainerClassNames
                            }}
                        >
                            {isFilterable ? (
                                <Autocomplete
                                    filter={contains}
                                    {...autocompleteProps}
                                >
                                    <SearchField
                                        autoFocus
                                        size={size}
                                        isFluid
                                        className={searchFieldClassNames}
                                        placeholder={stringFormatter.format("Select.searchPlaceholder")}
                                        {...otherSearchFieldProps}
                                    />
                                    {listBoxMarkup}
                                    {footerMarkup}
                                </Autocomplete>
                            ) : (
                                <>
                                    {listBoxMarkup}
                                    {footerMarkup}
                                </>
                            )}
                        </Popover>
                        <Button className={buttonClassNames} style={triggerStyle} data-invalid={isInvalid || undefined} {...otherTriggerProps}>
                            {prefixMarkup}
                            <SelectValue<T> size={size}>
                                {valueRenderProps => {
                                    return renderValue?.(valueRenderProps);
                                }}
                            </SelectValue>
                            <ToggleArrow
                                className={styles["hop-Select__button-icon"]}
                                isExpanded={isOpen}
                            />
                        </Button>
                        {description && (
                            <HelperMessage className={styles["hop-Select__helper-message"]}>
                                {description}
                            </HelperMessage>
                        )}
                        <ErrorMessage className={styles["hop-Select__error-message"]}>
                            {errorMessage}
                        </ErrorMessage>
                    </>
                );
            }}
        </RACSelect>
    );
}
const _SelectInternal = forwardRef(InternalSelect) as <T extends object, M extends "single" | "multiple" = "single">(
    props: InternalSelectProps<T, M> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof InternalSelect>;

export { _SelectInternal as SelectInternal };
