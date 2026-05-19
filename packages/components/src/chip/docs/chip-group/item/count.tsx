import { Badge, Chip, ChipGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ChipGroup aria-label="Filters">
            <Chip id="designer" textValue="Designer">
                <Text>Designer</Text>
                <Badge variant="subdued">12</Badge>
            </Chip>
            <Chip id="developer" textValue="Developer">
                <Text>Developer</Text>
                <Badge variant="subdued">100</Badge>
            </Chip>
            <Chip id="manager" textValue="Manager">
                <Text>Manager</Text>
                <Badge variant="subdued">99+</Badge>
            </Chip>
        </ChipGroup>
    );
}
