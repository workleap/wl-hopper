import { Button, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
            <Button size="sm" aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
            <Button size="xs" aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
        </Inline>
    );
}
