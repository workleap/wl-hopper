import { Button, Flex } from "@hopper-ui/components";

export function Example() {
    return (
        <Flex direction="row" alignItems="center" gap="inline-sm">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
        </Flex>
    );
}
