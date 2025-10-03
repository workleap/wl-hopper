import { Button, Inline } from "@hopper-ui/components";

export function Example() {
    return (
        <Inline gap="inline-sm">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
        </Inline>
    );
}
