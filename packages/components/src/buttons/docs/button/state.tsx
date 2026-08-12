import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button isDisabled variant="primary">
                Save
            </Button>
            <Button isDisabled variant="ghost-primary">
                Save
            </Button>
        </Inline>
    );
}
