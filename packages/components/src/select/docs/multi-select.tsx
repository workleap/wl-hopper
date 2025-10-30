import { MultiSelect, MultiSelectItem, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <MultiSelect label="Roles" defaultValue={["designer", "developer"]}>
                <MultiSelectItem id="designer">Designer</MultiSelectItem>
                <MultiSelectItem id="developer">Developer</MultiSelectItem>
                <MultiSelectItem id="manager">Manager</MultiSelectItem>
            </MultiSelect>
            <MultiSelect size="md" label="Roles" defaultValue={["designer", "developer"]}>
                <MultiSelectItem id="designer">Designer</MultiSelectItem>
                <MultiSelectItem id="developer">Developer</MultiSelectItem>
                <MultiSelectItem id="manager">Manager</MultiSelectItem>
            </MultiSelect>
        </Stack>
    );
}
