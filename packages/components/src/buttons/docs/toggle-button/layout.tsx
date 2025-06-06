import { Inline, Text, ToggleButton } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <ToggleButton isFluid variant="primary">
                Save
            </ToggleButton>
            <ToggleButton isFluid variant="primary">
                <SparklesIcon />
                <Text>Save</Text>
            </ToggleButton>
            <ToggleButton isFluid>
                <Text>Save</Text>
                <SparklesIcon slot="end-icon" />
            </ToggleButton>
        </Inline>
    );
}
