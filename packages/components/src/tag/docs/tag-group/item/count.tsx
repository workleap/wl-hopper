import { Badge, Tag, TagGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer" size="sm" textValue="Designer">
                <Text>Designer</Text>
                <Badge>12</Badge>
            </Tag>
            <Tag id="developer" size="md" textValue="Developer">
                <Text>Developer</Text>
                <Badge variant="subdued">100</Badge>
            </Tag>
            <Tag id="manager" size="lg" textValue="Manager">
                <Text>Manager</Text>
                <Badge>99+</Badge>
            </Tag>
        </TagGroup>
    );
}
