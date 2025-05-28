import { ContextualHelp, Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select label="Roles" contextualHelp={<ContextualHelp>These are all possible roles</ContextualHelp>}>
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}
