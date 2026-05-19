import { Chip, ChipGroup, type Selection } from "@hopper-ui/components";

export default function Example() {
    return (
        <ChipGroup
            aria-label="Filters"
            onRemove={(ids: Selection) => {
                alert(`Remove: ${[...ids]}`);
            }}
        >
            <Chip id="designer">Designer</Chip>
            <Chip id="developer">Developer</Chip>
            <Chip id="manager">Manager</Chip>
        </ChipGroup>
    );
}
