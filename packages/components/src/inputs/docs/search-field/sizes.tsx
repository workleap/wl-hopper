import { SearchField, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <SearchField label="Filter by location" placeholder="New York, NY" size="sm" />
            <SearchField label="Filter by location" placeholder="New York, NY" />
        </Stack>
    );
}
