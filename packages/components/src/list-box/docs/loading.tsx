import { ListBox } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox
            selectionMode="single"
            aria-label="list of options"
            isLoading
        >
            {[]}
        </ListBox>
    );
}
