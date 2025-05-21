import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            isInvalid
            label="Roles"
            errorMessage="This field is required"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}
