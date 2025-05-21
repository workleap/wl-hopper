import { Avatar, ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Username">
            <ComboBoxItem id="fred-smith" textValue="Fred Smith" >
                <Avatar src="https://i.pravatar.cc/96?img=3" name="Fred Smith" />
                <Text>Fred Smith</Text>
            </ComboBoxItem>
            <ComboBoxItem id="karen-smith" textValue="Karen Smith" >
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </ComboBoxItem>
            <ComboBoxItem id="john-doe" textValue="John Doe" >
                <Avatar name="John Doe" />
                <Text>John Doe</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}
