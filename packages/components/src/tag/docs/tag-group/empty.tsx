import { TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Status" renderEmptyState={() => "No jobs posting available"}>
            {[]}
        </TagGroup>
    );
}
