import { AngleLeftIcon, AngleRightIcon } from "@hopper-ui/icons";
import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { Calendar as AriaCalendar, composeRenderProps, FieldErrorContext, useContextProps, type CalendarProps as AriaCalendarProps, type DateValue } from "react-aria-components";

import { Button } from "../../buttons/index.ts";
import { ErrorMessage } from "../../error-message/index.ts";
import { Header, HeaderContext } from "../../header/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { Heading, HeadingContext } from "../../typography/index.ts";
import { cssModule, SlotProvider } from "../../utils/index.ts";

import { CalendarContext } from "./CalendarContext.ts";
import { CalendarGrid } from "./CalendarGrid.tsx";


import styles from "./Calendar.module.css";

export const GlobalCalendarCssSelector = "hop-Calendar";

export interface CalendarProps<T extends DateValue> extends StyledComponentProps<Omit<AriaCalendarProps<T>, "visibleDuration">> {
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
        children: childrenProp,
        errorMessage,
        style,
        visibleMonths = 1,
        ...otherProps
    } = ownProps;

    const children = composeRenderProps(childrenProp, prev => {
        return prev;
    });

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
            {renderProps => (
                <>
                    <SlotProvider
                        values={[
                            [HeaderContext, null],
                            [HeadingContext, null]
                        ]}
                    >
                        <Header className={styles["hop-Calendar__header"]}>
                            <Button
                                aria-label={stringFormatter.format("Calendar.previousButtonAriaLabel")}
                                className={styles["hop-Calendar__header-button"]}
                                slot="previous"
                                variant="ghost-secondary"
                            >
                                <AngleLeftIcon />
                            </Button>
                            <Heading className={styles["hop-Calendar__header-heading"]}>
                                {children(renderProps)}
                            </Heading>
                            <Button
                                aria-label={stringFormatter.format("Calendar.nextButtonAriaLabel")}
                                className={styles["hop-Calendar__header-button"]}
                                slot="next"
                                variant="ghost-secondary"
                            >
                                <AngleRightIcon />
                            </Button>
                        </Header>
                    </SlotProvider>
                    <div className={styles["hop-Calendar__grids"]}>
                        {Array.from({ length: visibleMonths }).map((_, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <CalendarGrid months={i} key={i} />
                        ))}
                    </div>
                    <SlotProvider
                        values={[
                            [FieldErrorContext, {
                                isInvalid: renderProps.isInvalid,
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
