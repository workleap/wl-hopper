import { Inline, Text, ToggleButton } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <ToggleButton aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </ToggleButton>
            <ToggleButton size="sm" aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </ToggleButton>
            <ToggleButton size="xs" aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </ToggleButton>
        </Inline>
    );
}
