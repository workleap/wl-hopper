import { Avatar, Chip, ChipGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ChipGroup aria-label="Filters">
            <Chip id="alex" textValue="Alex">
                <Avatar name="Alex Wilkins" />
                <Text>Alex</Text>
            </Chip>
            <Chip id="taylor" textValue="Taylor">
                <Avatar name="Taylor Reid" />
                <Text>Taylor</Text>
            </Chip>
        </ChipGroup>
    );
}
