import { Chip, ChipGroup, ContextualHelp } from "@hopper-ui/components";

export default function Example() {
    return (
        <ChipGroup label="Filters" contextualHelp={<ContextualHelp>Pick one or more filters</ContextualHelp>}>
            <Chip id="designer">Designer</Chip>
            <Chip id="developer">Developer</Chip>
            <Chip id="manager">Manager</Chip>
        </ChipGroup>
    );
}
