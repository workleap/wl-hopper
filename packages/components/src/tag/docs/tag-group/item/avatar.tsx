import { Avatar, Tag, TagGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Team Members">
            <Tag id="1" textValue="Frodo Baggin" size="sm">
                <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                <Text>Frodo Baggin</Text>
            </Tag>
            <Tag id="2" textValue="Karen Smith" size="md">
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </Tag>
            <Tag id="3" textValue="John Smith" size="lg">
                <Text>John Smith</Text>
                <Avatar name="John Smith" />
            </Tag>
        </TagGroup>
    );
}
