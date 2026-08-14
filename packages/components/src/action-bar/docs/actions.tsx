import { ActionBar, Button } from "@hopper-ui/components";

export default function Example() {
    return (
        <ActionBar selectedItemCount={12} onClearSelection={() => {}}>
            <Button variant="primary" size="sm">
                Approve
            </Button>
            <Button variant="secondary" size="sm">
                Export
            </Button>
            <Button variant="danger" size="sm">
                Delete
            </Button>
        </ActionBar>
    );
}
