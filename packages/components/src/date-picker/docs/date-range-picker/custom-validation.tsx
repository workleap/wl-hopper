import { Button, DateRangePicker, Form } from "@hopper-ui/components";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function Example() {
    return (
        <Form>
            <DateRangePicker
                label="Trip dates"
                validate={range =>
                    range?.end.compare(range.start) > 7
                        ? "Maximum stay duration is 1 week."
                        : null}
                defaultValue={{
                    start: today(getLocalTimeZone()),
                    end: today(getLocalTimeZone()).add({ weeks: 1, days: 3 })
                }}
            />
            <Button type="submit" variant="primary">
                Submit
            </Button>
        </Form>
    );
}
