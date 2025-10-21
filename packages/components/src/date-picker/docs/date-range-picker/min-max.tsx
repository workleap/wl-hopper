import { Button, DateRangePicker, Form } from "@hopper-ui/components";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

export default function Example() {
    return (
        <Form>
            <DateRangePicker
                label="Trip dates"
                minValue={today(getLocalTimeZone())}
                defaultValue={{
                    start: parseDate("2022-02-03"),
                    end: parseDate("2022-05-03")
                }}
            />
            <Button type="submit" variant="secondary">
                Submit
            </Button>
        </Form>
    );
}
