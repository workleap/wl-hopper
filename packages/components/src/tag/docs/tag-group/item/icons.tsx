import { IconList, Tag, TagGroup, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="developer" size="sm" textValue="Developer">
                <SparklesIcon />
                <Text>Developer</Text>
            </Tag>
            <Tag id="designer" size="md" textValue="Designer">
                <Text>Designer</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </Tag>
            <Tag id="manager" size="lg" textValue="Manager">
                <Text>Manager</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </Tag>
        </TagGroup>
    );
}
