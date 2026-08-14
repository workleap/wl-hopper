import { ActionBar, Button } from "@hopper-ui/components";

export default function Example() {
    return (
        <ActionBar selectedItemCount={12} totalItemCount={230} onClearSelection={() => {}}>
            <Button variant="secondary" size="sm">
                Export
            </Button>
        </ActionBar>
    );
}
