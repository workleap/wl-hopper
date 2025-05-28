import { ContextualHelp, Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles" label="Roles" contextualHelp={<ContextualHelp>These are all possible roles</ContextualHelp>}>
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    );
}
