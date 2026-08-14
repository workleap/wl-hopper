import { ActionBar, Button } from "@hopper-ui/components";

export default function Example() {
    return (
        <ActionBar
            selectedItemCount={3}
            selectionText={({ selectedItemCount }) => `${selectedItemCount} people selected`}
            onClearSelection={() => {}}
        >
            <Button variant="secondary" size="sm">
                Export
            </Button>
        </ActionBar>
    );
}
