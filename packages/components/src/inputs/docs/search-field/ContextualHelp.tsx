import { ContextualHelp, SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField
            placeholder="New York, NY"
            label="Filter by location"
            contextualHelp={<ContextualHelp>There's tons of locations, search for one!</ContextualHelp>}
        />
    );
}
