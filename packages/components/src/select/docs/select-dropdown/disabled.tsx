import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            disabledKeys={["developer"]}
            aria-label="list of options"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}
