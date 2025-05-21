import { Avatar, Select, SelectItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="Team">
            <SelectItem textValue="Fred Smith">
                <Avatar src="https://i.pravatar.cc/96?img=3" name="Fred Smith" />
                <Text>Fred Smith</Text>
            </SelectItem>
            <SelectItem textValue="Karen Smith">
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </SelectItem>
            <SelectItem textValue="John Doe">
                <Avatar name="John Doe" />
                <Text>John Doe</Text>
            </SelectItem>
        </Select>
    );
}
