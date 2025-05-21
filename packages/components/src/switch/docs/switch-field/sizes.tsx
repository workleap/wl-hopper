import { Inline, Switch, SwitchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <SwitchField size="sm" description="This will override your changes.">
                <Switch>Save</Switch>
            </SwitchField>
            <SwitchField size="md" description="This will override your changes.">
                <Switch>Save</Switch>
            </SwitchField>
        </Inline>
    );
}
