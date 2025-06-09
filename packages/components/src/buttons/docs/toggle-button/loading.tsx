import { Inline, ToggleButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <ToggleButton isLoading variant="primary">Save</ToggleButton>
            <ToggleButton isLoading variant="secondary">Save</ToggleButton>
            <ToggleButton isLoading variant="danger">Save</ToggleButton>
            <ToggleButton isLoading variant="upsell">Save</ToggleButton>
            <ToggleButton isLoading variant="ghost-primary">Save</ToggleButton>
            <ToggleButton isLoading variant="ghost-secondary">Save</ToggleButton>
            <ToggleButton isLoading variant="ghost-danger">Save</ToggleButton>
        </Inline>
    );
}
