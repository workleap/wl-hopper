import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" isInvalid label="Filter by location" errorMessage="No results were found" />
    );
}
