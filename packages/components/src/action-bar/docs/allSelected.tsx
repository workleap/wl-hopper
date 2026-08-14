import { ActionBar, Button } from "@hopper-ui/components";

export default function Example() {
    return (
        <ActionBar selectedItemCount="all" onClearSelection={() => {}}>
            <Button variant="secondary" size="sm">
                Export
            </Button>
        </ActionBar>
    );
}
