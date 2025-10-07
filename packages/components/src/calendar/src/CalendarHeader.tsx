import { AngleLeftIcon, AngleRightIcon } from "@hopper-ui/icons";
import clsx from "clsx";

import { Button } from "../../buttons/index.ts";
import { Header, HeaderContext, type HeaderProps } from "../../header/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { Heading, HeadingContext } from "../../typography/index.ts";
import { cssModule, SlotProvider } from "../../utils/index.ts";

import styles from "./CalendarHeader.module.css";

export const GlobalCalendarHeaderCssSelector = "hop-CalendarHeader";

export const CalendarHeader = (props: HeaderProps) => {
    const stringFormatter = useLocalizedString();
    const {
        className,
        ...otherProps
    } = props;

    const classNames = clsx(
        GlobalCalendarHeaderCssSelector,
        cssModule(
            styles,
            GlobalCalendarHeaderCssSelector
        ),
        className
    );

    return (
        <SlotProvider
            values={[
                [HeaderContext, null],
                [HeadingContext, null]
            ]}
        >
            <Header className={classNames} {...otherProps}>
                <Button
                    aria-label={stringFormatter.format("Calendar.previousButtonAriaLabel")}
                    className={styles["hop-CalendarHeader-button"]}
                    slot="previous"
                    variant="ghost-secondary"
                >
                    <AngleLeftIcon />
                </Button>
                <Heading className={styles["hop-CalendarHeader-heading"]} />
                <Button
                    aria-label={stringFormatter.format("Calendar.nextButtonAriaLabel")}
                    className={styles["hop-CalendarHeader-button"]}
                    slot="next"
                    variant="ghost-secondary"
                >
                    <AngleRightIcon />
                </Button>
            </Header>
        </SlotProvider>
    );
};
