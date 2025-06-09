import { Inline, ToggleButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <ToggleButton variant="primary">Save</ToggleButton>
            <ToggleButton variant="secondary">Save</ToggleButton>
            <ToggleButton variant="upsell">Save</ToggleButton>
            <ToggleButton variant="danger">Save</ToggleButton>
            <ToggleButton variant="ghost-primary">Save</ToggleButton>
            <ToggleButton variant="ghost-secondary">Save</ToggleButton>
            <ToggleButton variant="ghost-danger">Save</ToggleButton>
        </Inline>
    );
}
