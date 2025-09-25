import { AngleLeftIcon, AngleRightIcon } from "@hopper-ui/icons";
import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import type { GlobalDOMAttributes } from "@react-types/shared";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { Calendar as AriaCalendar, useContextProps, type CalendarProps as AriaCalendarProps, type DateValue } from "react-aria-components";

import { Button } from "../../buttons/index.ts";
import { Header, HeaderContext } from "../../header/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { HeadingContext } from "../../typography/index.ts";
import { cssModule, SlotProvider, type BaseComponentDOMProps } from "../../utils/index.ts";

import { CalendarContext } from "./CalendarContext.ts";
import { CalendarGrid } from "./CalendarGrid.tsx";
import { CalendarHeading } from "./CalendarHeading.tsx";

import styles from "./Calendar.module.css";

export const GlobalCalendarCssSelector = "hop-Calendar";

type OmittedCalendarProps = "visibleDuration" | "style" | "className" | "children" | keyof GlobalDOMAttributes;

export interface CalendarProps<T extends DateValue> extends Omit<AriaCalendarProps<T>, OmittedCalendarProps>, StyledComponentProps<BaseComponentDOMProps> {}

const Calendar = <T extends DateValue>(props: CalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, CalendarContext);

    const stringFormatter = useLocalizedString();
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
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
            style={mergedStyles}
            className={classNames}
        >
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
                    <CalendarHeading />
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
            <CalendarGrid />
        </AriaCalendar>
    );
};

/**
 * Calendar that will be used for the DateField component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _Calendar = forwardRef<HTMLDivElement, CalendarProps<any>>(Calendar);
_Calendar.displayName = "Calendar";

export { _Calendar as Calendar };
