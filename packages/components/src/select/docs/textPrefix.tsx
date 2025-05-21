import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            prefix="Operations"
            label="Roles"
        >
            <SelectItem id="project-coordinator">Project Coordinator</SelectItem>
            <SelectItem id="qa-specialist">QA Specialist</SelectItem>
            <SelectItem id="system-administrator">System Administrator</SelectItem>
        </Select>
    );
}
