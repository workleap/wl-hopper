import { DatePicker, useLocale } from "@hopper-ui/components";
import { isWeekend, parseDate } from "@internationalized/date";

export default function Example() {
    const { locale } = useLocale();

    return (
        <DatePicker
            label="Appointment date"
            validate={date => date && isWeekend(date, locale) ? "We are closed on weekends." : null}
            defaultValue={parseDate("2023-10-28")}
        />
    );
}
