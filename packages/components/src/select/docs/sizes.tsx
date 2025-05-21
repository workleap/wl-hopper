import { Select, SelectItem, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Select label="Roles">
                <SelectItem id="designer">Designer</SelectItem>
                <SelectItem id="developer">Developer</SelectItem>
                <SelectItem id="manager">Manager</SelectItem>
            </Select>
            <Select size="md" label="Roles">
                <SelectItem id="designer">Designer</SelectItem>
                <SelectItem id="developer">Developer</SelectItem>
                <SelectItem id="manager">Manager</SelectItem>
            </Select>
        </Stack>
    );
}
