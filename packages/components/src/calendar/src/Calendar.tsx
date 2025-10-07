import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { Calendar as AriaCalendar, FieldErrorContext, useContextProps, type CalendarProps as AriaCalendarProps, type DateValue } from "react-aria-components";

import { ErrorMessage } from "../../error-message/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { cssModule, SlotProvider } from "../../utils/index.ts";

import { CalendarContext } from "./CalendarContext.ts";
import { CalendarGrid } from "./CalendarGrid.tsx";
import { CalendarHeader } from "./CalendarHeader.tsx";

import styles from "./Calendar.module.css";

export const GlobalCalendarCssSelector = "hop-Calendar";

type OmittedCalendarProps = "visibleDuration" | "children";

export interface CalendarProps<T extends DateValue> extends StyledComponentProps<Omit<AriaCalendarProps<T>, OmittedCalendarProps>> {
    /**
   * The error message to display when the calendar is invalid.
   */
    errorMessage?: ReactNode;
    /**
   * The number of months to display at once.
   * @default 1
   */
    visibleMonths?: number;
}

const Calendar = <T extends DateValue>(props: CalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, CalendarContext);

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
        GlobalCalendarCssSelector,
        cssModule(
            styles,
            GlobalCalendarCssSelector
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <AriaCalendar
            {...otherProps}
            ref={ref}
            visibleDuration={{ months: visibleMonths }}
            style={mergedStyles}
            className={classNames}
        >
            {({ isInvalid }) => (
                <>
                    <CalendarHeader />
                    <div className={styles["hop-Calendar__grids"]}>
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
                        <ErrorMessage className={styles["hop-Calendar__error-message"]}>
                            {errorMessage || stringFormatter.format("Calendar.invalidSelection")}
                        </ErrorMessage>
                    </SlotProvider>
                </>
            )}
        </AriaCalendar>
    );
};

/**
 * A calendar displays one or more date grids and allows users to select a single date.
 *
 * [View Documentation](https://hopper.workleap.design/components/Calendar)
 */
const _Calendar = forwardRef<HTMLDivElement, CalendarProps<DateValue>>(Calendar);
_Calendar.displayName = "Calendar";

export { _Calendar as Calendar };
