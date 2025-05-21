import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <SegmentedControl UNSAFE_width="400px" isJustified aria-label="Time granularity">
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}
