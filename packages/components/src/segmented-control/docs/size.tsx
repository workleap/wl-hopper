import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <SegmentedControl aria-label="Time granularity" defaultSelectedKey="day" size="md">
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}
