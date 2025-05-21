import { Select, SelectItem } from "@hopper-ui/components";
import { OrgChartIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Select
            prefix={<OrgChartIcon />}
            label="Roles"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}
