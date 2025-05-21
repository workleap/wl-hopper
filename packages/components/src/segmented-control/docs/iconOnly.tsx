import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";
import { OrderedListIcon, UnorderedListIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <SegmentedControl aria-label="List ordering">
            <SegmentedControlItem id="unordered">
                <UnorderedListIcon aria-label="unordered" />
            </SegmentedControlItem>
            <SegmentedControlItem id="ordered">
                <OrderedListIcon aria-label="ordered" />
            </SegmentedControlItem>
        </SegmentedControl>
    );
}
