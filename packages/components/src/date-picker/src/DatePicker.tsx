import { CalendarIcon } from "@hopper-ui/icons";
import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { mergeRefs, useObjectRef } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type MutableRefObject } from "react";
import {
    DatePicker as AriaDatePicker,
    useContextProps,
    type DatePickerProps as AriaDatePickerProps,
    type DateValue
} from "react-aria-components";

import { Button } from "../../buttons/index.ts";
import { Calendar, type CalendarProps } from "../../calendar/index.ts";
import { ErrorMessage } from "../../error-message/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { InputGroup, type InputGroupProps } from "../../inputs/index.ts";
import { PopoverBase } from "../../overlays/index.ts";
import { FieldLabel } from "../../typography/index.ts";
import { ClearContainerSlots, cssModule, type FieldProps } from "../../utils/index.ts";

import { DateInput } from "./DateInput.tsx";
import { DatePickerContext } from "./DatePickerContext.ts";

import styles from "./DatePicker.module.css";

export const GlobalDatePickerCssSelector = "hop-DatePicker";

export interface DatePickerProps<T extends DateValue> extends
    StyledComponentProps<Omit<AriaDatePickerProps<T>, "children" | "hideTimezone" | "granularity" | "hourCycle">>,
    Pick<CalendarProps<T>, "createCalendar" | "pageBehavior" | "firstDayOfWeek" | "isDateUnavailable">,
    FieldProps {
    /**
     * If `true`, the DatePicker will take all available width.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * A ref for the HTML input element.
     */
    inputRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * The props for the InputGroup.
     */
    inputGroupProps?: InputGroupProps;

    /**
     * The maximum number of months to display at once in the calendar popover, if screen space permits.
     * @default 1
     */
    maxVisibleMonths?: number;

    /**
   * Whether the calendar should always display 6 weeks. This ensures that the height of the popover does not change between months, causing layout shifts.
   * @default true
   */
    isFixedWeeks?: boolean;
}

const DatePicker = <T extends DateValue>(props: DatePickerProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
    // we extract the inputRef props, since we want to manually merge it with the context props.
    const {
        inputRef: userProvidedInputRef = null,
        ...propsWithoutRef
    } = props;
    [props, ref] = useContextProps(propsWithoutRef, ref, DatePickerContext);
    const stringFormatter = useLocalizedString();
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        label,
        contextualHelp,
        description,
        errorMessage,
        isRequired,
        size: sizeProp,
        necessityIndicator,
        style,
        className,
        inputGroupProps,
        isFluid: isFluidProp,
        maxVisibleMonths = 1,
        createCalendar,
        isFixedWeeks = true,
        ...otherProps
    } = ownProps;

    const inputRef = useObjectRef(mergeRefs(userProvidedInputRef, props.inputRef !== undefined ? props.inputRef : null));
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    const { className: inputGroupClassName, ...otherInputGroupProps } = inputGroupProps ?? {};
    const size = useResponsiveValue(sizeProp) ?? "md";
    const inputGroupClassNames = clsx(styles["hop-DatePicker__InputGroup"], inputGroupClassName);

    const classNames = clsx(
        GlobalDatePickerCssSelector,
        cssModule(
            styles,
            GlobalDatePickerCssSelector,
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
        <AriaDatePicker
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
                            <DateInput size={size} ref={inputRef} />
                            <Button
                                aria-label={stringFormatter.format("DatePicker.openCalendarButtonAriaLabel")}
                                variant="ghost-secondary"
                                size={size}
                                className={styles["hop-DatePicker__Button"]}
                            >
                                <CalendarIcon />
                            </Button>
                        </InputGroup>
                    </ClearContainerSlots>
                );

                return (
                    <>
                        <FieldLabel
                            className={styles["hop-DatePicker__Label"]}
                            contextualHelp={contextualHelp}
                            isRequired={isRequired}
                            necessityIndicator={necessityIndicator}
                        >
                            {label}
                        </FieldLabel>
                        {inputMarkup}
                        {description && <HelperMessage className={styles["hop-DatePicker__HelperMessage"]}>{description}</HelperMessage>}
                        <ErrorMessage className={styles["hop-DatePicker__ErrorMessage"]}>{errorMessage}</ErrorMessage>
                        <PopoverBase className={styles["hop-DatePicker__Popover"]}>
                            <Calendar
                                visibleMonths={maxVisibleMonths}
                                createCalendar={createCalendar}
                                isFixedWeeks={isFixedWeeks}
                            />
                        </PopoverBase>
                    </>
                );
            }}
        </AriaDatePicker>
    );
};

/**
 * Date and time pickers allow users to select a single instance or range of dates and times.
 *
 * [View Documentation](https://hopper.workleap.design/components/DatePicker)
 */
const _DatePicker = forwardRef<HTMLDivElement, DatePickerProps<DateValue>>(DatePicker);
_DatePicker.displayName = "DatePicker";

export { _DatePicker as DatePicker };
