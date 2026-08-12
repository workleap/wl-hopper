import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button isLoading variant="primary">
                Save
            </Button>
            <Button isLoading variant="secondary">
                Save
            </Button>
            <Button isLoading variant="upsell">
                Save
            </Button>
            <Button isLoading variant="danger">
                Save
            </Button>
            <Button isLoading variant="ghost-primary">
                Save
            </Button>
            <Button isLoading variant="ghost-secondary">
                Save
            </Button>
            <Button isLoading variant="ghost-danger">
                Save
            </Button>
        </Inline>
    );
}
