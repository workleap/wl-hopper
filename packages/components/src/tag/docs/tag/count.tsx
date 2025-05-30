import { Badge, Inline, Tag, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
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
        </Inline>
    );
}
