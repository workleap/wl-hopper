import { MultiSelect, MultiSelectItem, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <MultiSelect label="Roles" defaultValue={["designer", "developer"]} renderValue={value => `Selected ${value.selectedItems.length}`}>
                <MultiSelectItem id="designer">Designer</MultiSelectItem>
                <MultiSelectItem id="developer">Developer</MultiSelectItem>
                <MultiSelectItem id="manager">Manager</MultiSelectItem>
            </MultiSelect>
        </Stack>
    );
}
