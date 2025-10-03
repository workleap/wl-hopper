import { CalendarIcon } from "@hopper-ui/icons";
import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { mergeRefs, useObjectRef } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type MutableRefObject } from "react";
import {
    DateRangePicker as AriaDateRangePicker,
    useContextProps,
    type DateRangePickerProps as AriaDateRangePickerProps,
    type DateValue
} from "react-aria-components";

import { Button } from "../../buttons/index.ts";
import { RangeCalendar, type RangeCalendarProps } from "../../calendar/index.ts";
import { ErrorMessage } from "../../error-message/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { InputGroup, type InputGroupProps } from "../../inputs/index.ts";
import { PopoverBase } from "../../overlays/index.ts";
import { FieldLabel } from "../../typography/index.ts";
import { ClearContainerSlots, cssModule, type FieldProps } from "../../utils/index.ts";

import { DateInput } from "./DateInput.tsx";
import { DateRangePickerContext } from "./DateRangePickerContext.ts";

import styles from "./DateRangePicker.module.css";

export const GlobalDateRangePickerCssSelector = "hop-DateRangePicker";

export interface DateRangePickerProps<T extends DateValue> extends
    StyledComponentProps<Omit<AriaDateRangePickerProps<T>, "children" | "hideTimezone" | "granularity" | "hourCycle">>,
    Pick<RangeCalendarProps<T>, "createCalendar" | "pageBehavior" | "firstDayOfWeek" | "isDateUnavailable">,
    FieldProps {
    /**
     * If `true`, the DateRangePicker will take all available width.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * A ref for the HTML input element.
     */
    inputStartRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * A ref for the HTML input element.
     */
    inputEndRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * The props for the InputGroup.
     */
    inputGroupProps?: InputGroupProps;

    /**
     * The maximum number of months to display at once in the calendar popover, if screen space permits.
     * @default 1
     */
    maxVisibleMonths?: number;
}

const DateRangePicker = <T extends DateValue>(props: DateRangePickerProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
    // we extract the inputRef props, since we want to manually merge it with the context props.
    const {
        inputStartRef: userProvidedInputStartRef = null,
        inputEndRef: userProvidedInputEndRef = null,
        ...propsWithoutRef
    } = props;
    [props, ref] = useContextProps(propsWithoutRef, ref, DateRangePickerContext);
    const stringFormatter = useLocalizedString();
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        label,
        contextualHelp,
        description,
        errorMessage,
        isRequired,
        size,
        necessityIndicator,
        style,
        className,
        inputGroupProps,
        isFluid: isFluidProp,
        maxVisibleMonths = 1,
        createCalendar,
        ...otherProps
    } = ownProps;

    const inputStartRef = useObjectRef(mergeRefs(userProvidedInputStartRef, props.inputStartRef !== undefined ? props.inputStartRef : null));
    const inputEndRef = useObjectRef(mergeRefs(userProvidedInputEndRef, props.inputEndRef !== undefined ? props.inputEndRef : null));
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    const { className: inputGroupClassName, ...otherInputGroupProps } = inputGroupProps ?? {};
    const inputGroupClassNames = clsx(styles["hop-DateRangePicker__InputGroup"], inputGroupClassName);

    const classNames = clsx(
        GlobalDateRangePickerCssSelector,
        cssModule(
            styles,
            GlobalDateRangePickerCssSelector,
            isFluid && "fluid",
            size
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <AriaDateRangePicker
            {...otherProps}
            ref={ref}
            className={classNames}
            style={mergedStyles}
        >
            {({ isDisabled, isInvalid }) => {
                const inputMarkup = (
                    <ClearContainerSlots>
                        <InputGroup
                            isDisabled={isDisabled}
                            isInvalid={isInvalid}
                            isFluid
                            className={inputGroupClassNames}
                            {...otherInputGroupProps}
                        >
                            <DateInput slot="start" size={size} ref={inputStartRef} />
                            <div className={styles["hop-DateRangePicker__Separator"]}>{stringFormatter.format("DateRangePicker.toSeparator")}</div>
                            <DateInput slot="end" size={size} ref={inputEndRef} />
                            <Button
                                aria-label={stringFormatter.format("DateRangePicker.openCalendarButtonAriaLabel")}
                                variant="ghost-secondary"
                                size={size}
                                className={styles["hop-DateRangePicker__Button"]}
                            >
                                <CalendarIcon />
                            </Button>
                        </InputGroup>
                    </ClearContainerSlots>
                );

                return (
                    <>
                        <FieldLabel
                            className={styles["hop-DateRangePicker__Label"]}
                            contextualHelp={contextualHelp}
                            isRequired={isRequired}
                            necessityIndicator={necessityIndicator}
                        >
                            {label}
                        </FieldLabel>
                        {inputMarkup}
                        {description && <HelperMessage className={styles["hop-DateRangePicker__HelperMessage"]}>{description}</HelperMessage>}
                        <ErrorMessage className={styles["hop-DateRangePicker__ErrorMessage"]}>{errorMessage}</ErrorMessage>
                        <PopoverBase className={styles["hop-DateRangePicker__Popover"]}>
                            <RangeCalendar
                                visibleMonths={maxVisibleMonths}
                                createCalendar={createCalendar}
                            />
                        </PopoverBase>
                    </>
                );
            }}
        </AriaDateRangePicker>
    );
};

/**
 * DateRangePickers combine two DateFields and a RangeCalendar popover to allow users to enter or select a date and time range.
 *
 * [View Documentation](https://hopper.workleap.design/components/DateRangePicker)
 */
const _DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps<DateValue>>(DateRangePicker);
_DateRangePicker.displayName = "DateRangePicker";

export { _DateRangePicker as DateRangePicker };
