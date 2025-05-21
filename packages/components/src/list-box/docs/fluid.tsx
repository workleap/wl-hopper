import { ListBox, ListBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox isFluid aria-label="list of options with a description">
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds, tests, and maintains software.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visually appealing, functional solutions.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Responsible for leading and overseeing a team or department to ensure organizational goals are met.</Text>
            </ListBoxItem>
        </ListBox>
    );
}
