import { Chip, ChipGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ChipGroup aria-label="Filters">
            <Chip id="designer">Designer</Chip>
            <Chip id="developer">Developer</Chip>
            <Chip id="manager">Manager</Chip>
        </ChipGroup>
    );
}
