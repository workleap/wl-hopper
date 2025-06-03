import { Checkbox, CheckboxGroup, ContextualHelp } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup label="Roles" contextualHelp={<ContextualHelp>This is a list of roles in the project</ContextualHelp>}>
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
        </CheckboxGroup>
    );
}
