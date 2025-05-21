import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="Roles">
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}
