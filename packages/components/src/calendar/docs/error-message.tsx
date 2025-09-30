import { Calendar, useLocale } from "@hopper-ui/components";
import { type DateValue, isWeekend, parseDate } from "@internationalized/date";
import { useState } from "react";

export default function Example() {
    const [date, setDate] = useState<DateValue>(parseDate("2023-06-25"));
    const { locale } = useLocale();
    const isInvalid = isWeekend(date, locale);

    return (
        <Calendar
            aria-label="Appointment date"
            value={date}
            onChange={setDate}
            isInvalid={isInvalid}
            errorMessage="We are closed on weekends"
        />
    );
}
