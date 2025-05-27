import { Avatar, Tag, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tag id="1" textValue="Frodo Baggin" size="sm">
            <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
            <Text>Frodo Baggin</Text>
        </Tag>
    );
}
