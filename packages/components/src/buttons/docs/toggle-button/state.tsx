import { Inline, ToggleButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <ToggleButton isDisabled variant="primary">Save</ToggleButton>
            <ToggleButton isDisabled variant="secondary">Save</ToggleButton>
            <ToggleButton isDisabled variant="upsell">Save</ToggleButton>
            <ToggleButton isDisabled variant="danger">Save</ToggleButton>
            <ToggleButton isDisabled variant="ghost-primary">Save</ToggleButton>
            <ToggleButton isDisabled variant="ghost-secondary">Save</ToggleButton>
            <ToggleButton isDisabled variant="ghost-danger">Save</ToggleButton>
        </Inline>
    );
}
