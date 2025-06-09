import { Inline, ToggleButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <ToggleButton isDisabled variant="primary">Save</ToggleButton>
            <ToggleButton isDisabled variant="secondary">Save</ToggleButton>
            <ToggleButton isDisabled variant="tertiary">Save</ToggleButton>
            <ToggleButton isDisabled variant="upsell">Save</ToggleButton>
        </Inline>
    );
}
