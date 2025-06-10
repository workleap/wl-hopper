import { Button, Inline } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
            <Button size="sm" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
            <Button size="xs" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
        </Inline>
    );
}
