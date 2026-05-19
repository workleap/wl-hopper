import { ChipGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ChipGroup aria-label="Filters" renderEmptyState={() => "No filters available"}>
            {[]}
        </ChipGroup>
    );
}
