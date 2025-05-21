import { ListBox } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox aria-label="list of options" renderEmptyState={() => "No results found."}>
            {[]}
        </ListBox>
    );
}
