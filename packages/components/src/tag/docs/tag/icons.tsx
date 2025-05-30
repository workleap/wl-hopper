import { IconList, Inline, Tag, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
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
        </Inline>
    );
}
