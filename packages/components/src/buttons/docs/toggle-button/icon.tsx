import { Inline, ToggleButton } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <ToggleButton aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </ToggleButton>
            <ToggleButton size="sm" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </ToggleButton>
        </Inline>
    );
}
