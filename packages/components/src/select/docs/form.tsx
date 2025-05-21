import { Form, Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form>
            <Select
                name="roles"
                label="Roles"
            >
                <SelectItem id="designer">Designer</SelectItem>
                <SelectItem id="developer">Developer</SelectItem>
                <SelectItem id="manager">Manager</SelectItem>
            </Select>
        </Form>
    );
}
