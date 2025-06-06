import { Inline, ToggleButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <ToggleButton variant="primary">Save</ToggleButton>
            <ToggleButton variant="secondary">Save</ToggleButton>
            <ToggleButton variant="tertiary">Save</ToggleButton>
            <ToggleButton variant="upsell">Save</ToggleButton>
        </Inline>
    );
}
