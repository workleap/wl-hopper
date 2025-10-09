import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import type { GlobalDOMAttributes } from "@react-types/shared";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { RangeCalendar as AriaRangeCalendar, FieldErrorContext, useContextProps, type RangeCalendarProps as AriaRangeCalendarProps, type DateValue } from "react-aria-components";

import { ErrorMessage } from "../../error-message/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { cssModule, SlotProvider, type BaseComponentDOMProps } from "../../utils/index.ts";

import { CalendarGrid } from "./CalendarGrid.tsx";
import { CalendarHeader } from "./CalendarHeader.tsx";
import { RangeCalendarContext } from "./RangeCalendarContext.ts";

import styles from "./RangeCalendar.module.css";

export const GlobalRangeCalendarCssSelector = "hop-RangeCalendar";

type OmittedRangeCalendarProps = "visibleDuration" | "style" | "className" | "children" | keyof GlobalDOMAttributes;

export interface RangeCalendarProps<T extends DateValue> extends Omit<AriaRangeCalendarProps<T>, OmittedRangeCalendarProps>, StyledComponentProps<BaseComponentDOMProps> {
    /**
   * The error message to display when the range calendar is invalid.
   */
    errorMessage?: ReactNode;
    /**
   * The number of months to display at once.
   * @default 1
   */
    visibleMonths?: number;
}

const RangeCalendar = <T extends DateValue>(props: RangeCalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, RangeCalendarContext);

    const stringFormatter = useLocalizedString();
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        errorMessage,
        style,
        visibleMonths = 1,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalRangeCalendarCssSelector,
        cssModule(
            styles,
            GlobalRangeCalendarCssSelector
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <AriaRangeCalendar
            {...otherProps}
            ref={ref}
            visibleDuration={{ months: visibleMonths }}
            style={mergedStyles}
            className={classNames}
        >
            {({ isInvalid }) => (
                <>
                    <CalendarHeader />
                    <div className={styles["hop-RangeCalendar__grids"]}>
                        {Array.from({ length: visibleMonths }).map((_, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <CalendarGrid offset={{ months: i }} key={i} />
                        ))}
                    </div>
                    <SlotProvider
                        values={[
                            [FieldErrorContext, {
                                isInvalid,
                                validationErrors: [] as never[],
                                validationDetails: {} as never
                            }]
                        ]}
                    >
                        <ErrorMessage className={styles["hop-RangeCalendar__error-message"]}>
                            {errorMessage || stringFormatter.format("Calendar.invalidSelection")}
                        </ErrorMessage>
                    </SlotProvider>
                </>
            )}
        </AriaRangeCalendar>
    );
};

/**
 * A range calendar displays one or more date grids and allows users to select a contiguous range of dates.
 *
 * [View Documentation](https://hopper.workleap.design/components/RangeCalendar)
 */
const _RangeCalendar = forwardRef<HTMLDivElement, RangeCalendarProps<DateValue>>(RangeCalendar);
_RangeCalendar.displayName = "RangeCalendar";

export { _RangeCalendar as RangeCalendar };
