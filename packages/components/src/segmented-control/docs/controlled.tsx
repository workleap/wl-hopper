import { SegmentedControl, SegmentedControlItem, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key>("day");

    const handleSelectionChange = (key: Key) => {
        if (selectedKey === key) {
            return;
        }

        setSelectedKey(key);
    };

    return (
        <SegmentedControl
            aria-label="Time granularity"
            selectedKey={selectedKey}
            onSelectionChange={handleSelectionChange}
        >
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}
