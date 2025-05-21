import { SegmentedControl, SegmentedControlItem, Text } from "@hopper-ui/components";
import { OrderedListIcon, UnorderedListIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <SegmentedControl aria-label="List ordering">
            <SegmentedControlItem id="unordered">
                <UnorderedListIcon slot="start-icon" />
                <Text>Unordered</Text>
            </SegmentedControlItem>
            <SegmentedControlItem id="ordered">
                <Text>Ordered</Text>
                <OrderedListIcon />
            </SegmentedControlItem>
        </SegmentedControl>
    );
}
