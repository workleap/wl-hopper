import { Inline, ToggleButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <ToggleButton isLoading variant="primary">Save</ToggleButton>
            <ToggleButton isLoading variant="secondary">Save</ToggleButton>
            <ToggleButton isLoading variant="tertiary">Save</ToggleButton>
            <ToggleButton isLoading variant="upsell">Save</ToggleButton>
        </Inline>
    );
}
