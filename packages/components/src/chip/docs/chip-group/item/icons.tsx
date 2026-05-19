import { Chip, ChipGroup, IconList, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ChipGroup aria-label="Filters">
            <Chip id="developer" textValue="Developer">
                <SparklesIcon />
                <Text>Developer</Text>
            </Chip>
            <Chip id="designer" textValue="Designer">
                <Text>Designer</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </Chip>
        </ChipGroup>
    );
}
