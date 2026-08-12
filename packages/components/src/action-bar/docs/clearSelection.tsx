import { ActionBar, Button } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedItemCount, setSelectedItemCount] = useState(5);

    return (
        <ActionBar selectedItemCount={selectedItemCount} onClearSelection={() => setSelectedItemCount(0)}>
            <Button variant="secondary" size="sm">
                Archive
            </Button>
        </ActionBar>
    );
}
