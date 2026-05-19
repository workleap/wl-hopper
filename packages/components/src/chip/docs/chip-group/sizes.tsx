import { Chip, ChipGroup, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <ChipGroup aria-label="Filters" size="sm">
                <Chip id="designer">Designer</Chip>
                <Chip id="developer">Developer</Chip>
                <Chip id="manager">Manager</Chip>
            </ChipGroup>
            <ChipGroup aria-label="Filters" size="md">
                <Chip id="designer">Designer</Chip>
                <Chip id="developer">Developer</Chip>
                <Chip id="manager">Manager</Chip>
            </ChipGroup>
            <ChipGroup aria-label="Filters" size="lg">
                <Chip id="designer">Designer</Chip>
                <Chip id="developer">Developer</Chip>
                <Chip id="manager">Manager</Chip>
            </ChipGroup>
        </Stack>
    );
}
