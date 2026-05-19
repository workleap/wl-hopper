import { Chip, ChipGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ChipGroup label="Filters" description="Pick the roles you want to include in the search">
            <Chip id="designer">Designer</Chip>
            <Chip id="developer">Developer</Chip>
            <Chip id="manager">Manager</Chip>
        </ChipGroup>
    );
}
